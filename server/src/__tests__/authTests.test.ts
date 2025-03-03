import request from "supertest";
import app from "../index";
import { db } from "../db";

describe("Health Check", () => {
  it("Should return a 200 staus", async () => {
    const res = await request(app).get("/api/v1/health");
    expect(res.status).toBe(200);
  });
});
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  password: "4rfv5tgb$RFV%TGB",
  email: "testuser@mail.io",
};
describe("Register User", () => {
  it("Should register a user", async () => {
    const foundUser = await db.user.findUnique({
      where: { email: mockUser.email },
    });
    if (foundUser) {
      await db.user.delete({ where: { email: mockUser.email } });
    }
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUser)
      .expect(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("accessToken");
  });
  it("Should throw an error if user exists already", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUser)
      .expect(400);
    expect(res.body.message).toBe("User Already Exists");
  });
  it("Should throw an error if the password doesn't match regex pattern", async () => {
    const { email, firstName, lastName } = mockUser;
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({ email, firstName, lastName, password: "123" })
      .expect(400);
    // message comes from zod as an array
    expect(JSON.parse(res.body.message)[0].message).toBe(
      "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one special character (@$!%*?&), and one number."
    );
  });
});

describe("Login User", () => {
  it("Should Sign In User and Set HTTP Only Cookie", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);
    // Verify user and accessToken
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data).toHaveProperty("accessToken");
    const cookies = res.headers["set-cookie"];
    expect(cookies).toBeDefined();

    // Verify Refresh HTTP Only Cookie
    const refreshToken = (cookies as unknown as string[]).find((c) =>
      c.startsWith("refresh")
    );
    expect(refreshToken).toBeDefined();
    expect(refreshToken).toMatch("HttpOnly");
  });
  it("Should Return Bad Request If Password Fails Regex Test", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: "123" })
      .expect(400);

    // message comes from zod as an array
    expect(JSON.parse(res.body.message)[0].message).toBe(
      "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one special character (@$!%*?&), and one number."
    );
  });

  it("Should Return Not Authorized for Incorrect Password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: mockUser.email,
        password: "1" + mockUser.password.slice(1),
      })
      .expect(401);
  });
});
