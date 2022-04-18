import api from "./api";

describe.skip("Test api", () => {
  test("Returns data", async () => {
    const data = await api.getData({snapshotId:1});
    expect(data).toEqual({});
  });
});
