import api from "./api";

describe.skip("Test api", () => {
  test("Returns data", async () => {
    const data = await api.getData("1 Jan 2020");
    expect(data).toEqual({});
    expect(1).toBe(1);
  });
});
