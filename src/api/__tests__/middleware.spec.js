const {
  errorHandler,
  notFoundHandler,
  successHandler,
} = require("../middleware");

const createMocks = () => {
  const nextMock = jest.fn();
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };
  const log = jest.fn();

  return { log, next: nextMock, res };
};

const stringify = obj => JSON.stringify(obj);

describe("errorHandler", () => {
  it("Does not call next", () => {
    const { next, res } = createMocks();
    errorHandler()(new Error(123), {}, res, next);
    expect(next.mock.calls.length).toBe(0);
  });

  it("Calls log function on error", () => {
    const { next, res, log } = createMocks();
    const error = new Error("foo");
    const req = {};
    errorHandler({ log })(error, req, res, next);

    expect(log.mock.calls.length).toBe(1);
    expect(log.mock.calls[0][0]).toBe(error);
    expect(log.mock.calls[0][1]).toBe(req);
  });

  it("Prints the error message", () => {
    const { next, res } = createMocks();
    const errorMessage = "foo";
    errorHandler()(new Error(errorMessage), {}, res, next);

    expect(stringify(res.json.mock.calls[0])).toMatch(errorMessage);
  });

  it("Sets the status to the status of the error if set", () => {
    const { next, res } = createMocks();
    const status = 123;
    errorHandler()({ mesasge: "foo", status }, {}, res, next);

    expect(res.status.mock.calls[0]).toContain(status);
  });

  it("Uses 500 as the default status code", () => {
    const { next, res } = createMocks();
    errorHandler()(new Error("foo"), {}, res, next);

    expect(res.status.mock.calls[0]).toContain(500);
  });
});

describe("notFoundHandler", () => {
  it("Does not call next", () => {
    const { next, res } = createMocks();
    notFoundHandler()({}, res, next);
    expect(next.mock.calls.length).toBe(0);
  });

  it("Calls log function", () => {
    const { next, res, log } = createMocks();
    const req = {};
    notFoundHandler({ log })(req, res, next);

    expect(log.mock.calls.length).toBe(1);
    expect(log.mock.calls[0][0]).toBe(req);
  });

  it("Prints the not found message", () => {
    const { next, res } = createMocks();
    notFoundHandler()({}, res, next);

    expect(stringify(res.json.mock.calls[0])).toMatch(/not found/);
  });

  it("Sets the status code to 404", () => {
    const { next, res } = createMocks();
    notFoundHandler()({}, res, next);

    expect(res.status.mock.calls[0]).toContain(404);
  });
});

describe("successHandler", () => {
  it("Does not call next", () => {
    const { next, res } = createMocks();
    successHandler({})({}, res, next);
    expect(next.mock.calls.length).toBe(0);
  });

  it("Prints the result", () => {
    const { next, res } = createMocks();
    successHandler({})({}, res, next);

    expect(stringify(res.json.mock.calls[0])).toMatch(/result/);
  });

  it("Sets the given status code", () => {
    const { next, res } = createMocks();
    const status = 123;
    successHandler({ status })({}, res, next);

    expect(res.status.mock.calls[0]).toContain(status);
  });
});
