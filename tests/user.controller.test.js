const UserController = require("../controllers/user.controller");
const httpMocks = require("node-mocks-http");
const { db } = require("../config/db");
const { hashPassword } = require("../helpers/bcrpyt");
jest.mock("../config/db.js");
let req, res;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const userData = {
  email: "kirawannnn@gmail.com",
  password: "secret",
};

const loginUserData = {
  email: "kirawannnn@gmail.com",
  password: "secret",
};

const testData1 = {
  rows: [],
};

const testData2 = {
  rows: [
    {
      email: "kirawannnn@gmail.com",
      password: hashPassword("secret"),
    },
  ],
};

const testData3 = {
  rows: [
    {
      email: "kirawannnn@gmail.com",
      password: hashPassword("supersecret"),
    },
  ],
};

const queryText = `delete from users where email = '${userData.email}'`;
beforeEach(() => {
  jest.clearAllMocks();
});

describe("UserController.registerUser", () => {
  it("should return 200", async () => {
    req.body = userData;
    db.query.mockResolvedValue(testData1);
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 400", async () => {
    req.body = userData;
    db.query.mockResolvedValue(testData2);
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    db.query.mockResolvedValueOnce(testData1).mockResolvedValue(rejected);
    req.body = userData;
    await UserController.registerUser(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("UserController.loginUser", () => {
  it("should return 200", async () => {
    req.body = userData;
    db.query.mockResolvedValueOnce(testData2).mockResolvedValue(loginUserData);
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 400", async () => {
    req.body = userData;
    db.query.mockResolvedValueOnce(testData3).mockResolvedValue(loginUserData);
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(400);
  });
  it("should return 503", async () => {
    req.body = userData;
    db.query.mockResolvedValue(testData1);
    await UserController.loginUser(req, res);
    expect(res.statusCode).toBe(503);
  });
});

afterAll(async () => {
  await db.query(queryText);
});
