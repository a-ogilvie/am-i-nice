const expect = chai.expect;

describe("fb.js", () => {
  describe("statusChangeCallback", () => {
    it("should be a function", () => {
      expect(statusChangeCallback).to.be.a("function");
    });
  });
});
