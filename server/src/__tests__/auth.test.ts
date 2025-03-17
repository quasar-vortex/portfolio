import request from "supertest";
import app from "../index";
import { db } from "../db";
import { jwtUtils } from "../utils";
import { appEnv } from "../env";

const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  password: "edcRz&7EEed",
};
const mockHash =
  "$argon2id$v=19$m=65536,t=3,p=4$m6aWQMtWr7RC8Nfd4ETE+A$2R5DP8NqIRQdwLfO7IcdVOPMa/woY43JeqquZQFiCAg";

// Function to generate a fake authentication cookie
export const generateAuthCookie = (userId: string): string => {
  const refreshToken = jwtUtils.signUserToken("REFRESH", { id: userId });
  return `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Max-Age=${
    60 * 60 * 24 * 7
  }`;
};

describe("Auth Controller", () => {
  beforeAll(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.user.deleteMany();
  });

  it("Should Register A New User", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/register`)
      .send(mockUser)
      .expect(201);

    expect(res.body.data.user.firstName).toBe(mockUser.firstName);

    // Check Cookies
    const cookies = res.headers["set-cookie"] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(cookies.length).toBeGreaterThan(0);

    // Check Refresh Token
    const rToken = cookies.find((c) => c.startsWith("refreshToken"));
    expect(rToken).toBeDefined();
    expect(rToken).toMatch(/HttpOnly/);
  });

  it("Bad Request for Failed Regex On Password", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/register`)
      .send({
        ...mockUser,
        password: "123", // Weak password
      })
      .expect(400);
  });

  it("Should Throw An Error If User Exists On Register Attempt", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/register`)
      .send(mockUser)
      .expect(400);

    expect(res.body.message).toBe("User Already Exists");
  });

  it("Should Login A User", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/login`)
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);

    // Check Cookies
    const cookies = res.headers["set-cookie"] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(cookies.length).toBeGreaterThan(0);

    // Check Refresh Token
    const rToken = cookies.find((c) => c.startsWith("refreshToken"));
    expect(rToken).toBeDefined();
    expect(rToken).toMatch(/HttpOnly/);
  });

  it("Should Throw An Error If User Is Not Found On Login Attempt", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/login`)
      .send({ email: "invalid" + mockUser.email, password: mockUser.password })
      .expect(401);

    expect(res.body.message).toBe("Email or Password is incorrect");
  });

  it("Should Throw Error If Password Is Incorrect and Regex Passes", async () => {
    const res = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/login`)
      .send({
        email: mockUser.email,
        password:
          mockUser.password.slice(0, mockUser.password.length - 1) + "s",
      })
      .expect(401);

    expect(res.body.message).toBe("Email or Password is incorrect");
  });

  it("Should Refresh A User With New Access Token", async () => {
    const loginRes = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/login`)
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);

    const cookies = loginRes.headers["set-cookie"] as unknown as string[];
    const rToken = cookies.find((c) => c.startsWith("refreshToken"));
    expect(rToken).toBeDefined();
    expect(rToken).toMatch(/HttpOnly/);

    const refreshRes = await request(app)
      .get(`/api/${appEnv.API_VERSION}/auth/refresh`)
      .set("Cookie", rToken!)
      .send()
      .expect(200);

    expect(refreshRes.body.data.accessToken).toBeDefined();
  });

  it("Should Throw An Error If Missing Refresh Token", async () => {
    const refreshRes = await request(app)
      .get(`/api/${appEnv.API_VERSION}/auth/refresh`)
      .send()
      .expect(400);

    expect(refreshRes.body.message).toBe("Missing Refresh Token");
  });

  it("Should Throw An Error If No User Found On Refresh", async () => {
    const fakeCookie = generateAuthCookie("invalid-user-id");

    const refreshRes = await request(app)
      .get(`/api/${appEnv.API_VERSION}/auth/refresh`)
      .set("Cookie", fakeCookie)
      .send()
      .expect(401);

    expect(refreshRes.body.message).toBe("User Not Found");
  });

  it("Should Log Off a User", async () => {
    const loginRes = await request(app)
      .post(`/api/${appEnv.API_VERSION}/auth/login`)
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);

    const cookies = loginRes.headers["set-cookie"] as unknown as string[];
    expect(cookies).toBeDefined();
    expect(cookies.length).toBeGreaterThan(0);

    const rToken = cookies.find((c) => c.startsWith("refreshToken"));
    expect(rToken).toBeDefined();

    const logOffRes = await request(app)
      .get(`/api/${appEnv.API_VERSION}/auth/logoff`)
      .set("Cookie", rToken!)
      .send()
      .expect(200);

    expect(logOffRes.body.message).toBe("User Signed Out");
  });

  it("Should Throw An Error If No User Found to Logoff", async () => {
    const fakeCookie = generateAuthCookie("invalid-user-id");

    await request(app)
      .get(`/api/${appEnv.API_VERSION}/auth/logoff`)
      .set("Cookie", fakeCookie)
      .send()
      .expect(401);
  });
});
