import request from "supertest";
import app from "../index";
import { db } from "../db";
import { mockUser } from "./authTests.test";
import { jwtUtils, passUtils } from "../utils";

describe("Update User", () => {
  it("Should Update The User", async () => {
    // Sign in user and get an access token
    const userInfo = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);
    // send update request to the endpoint
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${userInfo.body.data.accessToken}`)
      .send({ ...mockUser, newPassword: mockUser.password + "1" });

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("firstName");
  });
  it("Should Throw An Error If User Doesn't Exist", async () => {
    // Sign in user and get an access token
    const userInfo = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password + "1" })
      .expect(200);

    await db.user.delete({ where: { email: mockUser.email } });
    // send update request to the endpoint
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${userInfo.body.data.accessToken}`)
      .send({ ...mockUser, newPassword: mockUser.password + "1" });

    expect(res.status).toBe(401);
    await db.user.create({
      data: {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        passwordHash: await passUtils.hashPass(mockUser.password),
      },
    });
  });

  it("Should Throw An Error If Old Password Not Provided With New", async () => {
    // Sign in user and get an access token
    const userInfo = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);
    // send update request to the endpoint
    const { password, ...restOfMock } = mockUser;
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${userInfo.body.data.accessToken}`)
      .send({ ...restOfMock, newPassword: mockUser.password + "1" });
    // Should be bad request without old password
    expect(res.status).toBe(400);
  });
  it("Should Throw An Error If Password Is Wrong", async () => {
    // Sign in user and get an access token
    const userInfo = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);
    // send update request to the endpoint
    const { password, ...restOfMock } = mockUser;
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${userInfo.body.data.accessToken}`)
      .send({
        ...restOfMock,
        password: mockUser.password.slice(2) + "11",
        newPassword: mockUser.password + "1",
      });
    expect(res.status).toBe(401);
  });
  it("Should Throw An Error If No Update to Do", async () => {
    // Sign in user and get an access token
    const userInfo = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: mockUser.email, password: mockUser.password })
      .expect(200);
    // send update request to the endpoint
    const res = await request(app)
      .patch("/api/v1/users/me")
      .set("Authorization", `Bearer ${userInfo.body.data.accessToken}`)
      .send();
    expect(res.status).toBe(400);
  });
});
