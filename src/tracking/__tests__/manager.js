const { getCount, increaseCount, saveData } = require("../manager");

const createMocks = () => {
  return {
    append: jest.fn(),
    get: jest.fn(),
    put: jest.fn(),
  };
};

describe("getCount", () => {
  it("Calls get function and returns it's number value", async () => {
    const { get } = createMocks();
    const returnValue = "123";
    const result = await getCount({ get: get.mockReturnValue(returnValue) });
    expect(result).toBe(+returnValue);
  });

  it("Calls get function and returns 0 if given value is invalid", async () => {
    const { get } = createMocks();
    const result = await getCount({ get: get.mockReturnValue(null) });
    expect(result).toBe(0);
  });
});

describe("increaseCount", () => {
  it("Calls get function and returns it's number value", async () => {
    const { get, put } = createMocks();
    const a = 10;
    const b = 5;
    await increaseCount(a, { get: get.mockReturnValue(b), put });
    expect(put.mock.calls.pop()).toContain(a + b);
  });
});

describe("saveData", () => {
  it("Stringifies data and saves it to logs.txt file", async () => {
    const { append } = createMocks();
    const data = { a: "foo", b: [5, "bar", null] };
    await saveData(data, { append });
    expect(append.mock.calls.pop()).toEqual([
      "logs.txt",
      JSON.stringify(data) + "\n",
    ]);
  });
});
