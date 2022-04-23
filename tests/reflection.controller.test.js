const ReflectionController = require("../controllers/reflection.controller");
const httpMocks = require("node-mocks-http");
const db = require("../config/db.js");

jest.mock('../config/db.js');

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

const reflectionData = {
  success: "today success",
  low_point: "new Low Key Point",
  take_away: "new take away",
};

describe("ReflectionController.postReflection", () => {
  it("should return 503", async () => {
    req.body = reflectionData;
    db.db.query.mockResolvedValue(reflectionData)
    await ReflectionController.postReflection(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("ReflectionController.getReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    db.db.query.mockResolvedValue(reflectionData)
    await ReflectionController.getReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    const rejected = Promise.reject({ message: "ini error"});
    db.db.query.mockResolvedValue(rejected)
    req.body = reflectionData;
    await ReflectionController.getReflection(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("ReflectionController.deleteReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    db.db.query.mockResolvedValue(reflectionData)
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 404", async () => {
    const rejected = Promise.reject({ message: "ini error"});
    db.db.query.mockResolvedValue(rejected)
    req.body = reflectionData;
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(404);
  });
});

describe("ReflectionController.updateReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    db.db.query.mockResolvedValue(reflectionData)
    await ReflectionController.updateReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 404", async () => {
    const rejected = Promise.reject({ message: "ini error"});
    db.db.query.mockResolvedValue(rejected)
    req.body = reflectionData;
    await ReflectionController.updateReflection(req, res);
    expect(res.statusCode).toBe(404);
  });
});