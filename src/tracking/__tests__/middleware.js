const {
  displayCount,
  increaseCountIfInBody,
  saveBodyRequest,
} = require("../middleware");

const createMocks = () => {
  const nextMock = jest.fn();
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const req = {
    body: { foo: "bar", count: 123 },
  };

  return {
    getCount: jest.fn(),
    increaseCount: jest.fn(),
    next: nextMock,
    req,
    res,
    save: jest.fn(),
  };
};

const stringify = obj => JSON.stringify(obj);

describe("displayCount", () => {
  it("Does not call next", async () => {
    const { getCount, res, next } = createMocks();
    await displayCount({ getCount })({}, res, next);
    expect(next.mock.calls.length).toBe(0);
  });

  it("Displays value given from the function getCount", async () => {
    const { getCount, res, next } = createMocks();
    const value = 123;
    await displayCount({ getCount: getCount.mockReturnValue(value) })(
      {},
      res,
      next,
    );
    expect(res.json.mock.calls.length).toBe(1);
    expect(stringify(res.json.mock.calls[0][0])).toMatch(value + "");
  });
});

describe("saveBodyRequest", () => {
  it("Calls next", async () => {
    const { save, next } = createMocks();
    await saveBodyRequest({ save })({}, {}, next);
    expect(next.mock.calls.length).toBe(1);
  });
  it("Saves body request by calling save function", async () => {
    const { save, next, req } = createMocks();
    await saveBodyRequest({ save })(req, {}, next);
    expect(save.mock.calls.length).toBe(1);
    expect(save.mock.calls[0][0]).toBe(req.body);
  });
});

describe("increaseCountIfInBody", () => {
  it("Calls next", async () => {
    const { next, increaseCount, req } = createMocks();
    await increaseCountIfInBody({ increaseCount })(req, {}, next);
    expect(next.mock.calls.length).toBe(1);
  });

  it("Calls the increaseCount function with the count param", async () => {
    const { next, increaseCount, req } = createMocks();
    await increaseCountIfInBody({ increaseCount })(req, {}, next);
    expect(increaseCount.mock.calls.length).toBe(1);
    expect(increaseCount.mock.calls[0][0]).toBe(req.body.count);
  });

  it("Does not crash when no count provided", async () => {
    const { next, increaseCount } = createMocks();
    await increaseCountIfInBody({ increaseCount })({ body: {} }, {}, next);
    expect(increaseCount.mock.calls.length).toBe(0);
    expect(next.mock.calls.length).toBe(1);
  });
});
