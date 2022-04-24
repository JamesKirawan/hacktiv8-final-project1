const ReflectionController = require("../controllers/reflection.controller");
const httpMocks = require("node-mocks-http");
const { db } = require("../config/db.js");

jest.mock("../config/db.js");

let req, res;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
});

beforeEach(() => {
  jest.clearAllMocks();
});

const reflectionData = {
  success: "today success",
  low_point: "new Low Key Point",
  take_away: "new take away",
};

const testData1 = {
  rows: [],
};

const testData2 = {
  rows: [
    {
      id: "1",
      success: "today success",
      low_point: "new Low Key Point",
      take_away: "new take away",
      owner_id: "12",
    },
  ],
};

describe("ReflectionController.postReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(reflectionData);
    await ReflectionController.postReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 503", async () => {
    const rejected = Promise.reject({ message: "Error" });
    req.body = reflectionData;
    db.query.mockResolvedValue(rejected);
    await ReflectionController.postReflection(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("ReflectionController.getReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(reflectionData);
    await ReflectionController.getReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 500", async () => {
    const rejected = Promise.reject({ message: "ini error" });
    db.query.mockResolvedValue(rejected);
    req.body = reflectionData;
    await ReflectionController.getReflection(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe("ReflectionController.deleteReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    req.user_id = "12";
    db.query.mockResolvedValue(testData2);
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 401", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(testData2);
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("should return 404", async () => {
    const rejected = Promise.reject({ message: "Error" });
    req.body = reflectionData;
    req.user_id = "12";
    db.query.mockResolvedValueOnce(testData2).mockResolvedValue(rejected);
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(404);
  });
  it("should return 503", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(testData1);
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(503);
  });
});

describe("ReflectionController.updateReflection", () => {
  it("should return 200", async () => {
    req.body = reflectionData;
    req.user_id = "12";
    db.query.mockResolvedValue(testData2);
    await ReflectionController.updateReflection(req, res);
    expect(res.statusCode).toBe(200);
  });
  it("should return 401", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(testData2);
    await ReflectionController.deleteReflection(req, res);
    expect(res.statusCode).toBe(401);
  });
  it("should return 404", async () => {
    const rejected = Promise.reject({ message: "ini error" });
    req.body = reflectionData;
    req.user_id = "12";
    db.query.mockResolvedValueOnce(testData2).mockResolvedValue(rejected);
    await ReflectionController.updateReflection(req, res);
    expect(res.statusCode).toBe(404);
  });
  it("should return 503", async () => {
    req.body = reflectionData;
    db.query.mockResolvedValue(testData1);
    await ReflectionController.updateReflection(req, res);
    expect(res.statusCode).toBe(503);
  });
});
