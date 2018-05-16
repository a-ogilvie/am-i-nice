const expect = chai.expect;

describe("fb.js", () => {
  describe("statusChangeCallback", () => {
    let hideElementStub;
    let showElementStub;
    let fetchPostsStub;
    let getElementByIdStub;
    let fakeElement = document.createElement("div");

    before(() => {
      hideElementStub = sinon.stub(window, "hideElement");
      showElementStub = sinon.stub(window, "showElement");
      fetchPostsStub = sinon.stub(window, "fetchPosts");
      getElementByIdStub = sinon.stub(document, "getElementById");
      getElementByIdStub.returns(fakeElement);
    });

    after(() => {
      hideElementStub.restore();
      showElementStub.restore();
      fetchPostsStub.restore();
      getElementByIdStub.restore();
    });

    it("should be a function", () => {
      expect(statusChangeCallback).to.be.a("function");
    });

    it("should call fetchPosts when given a successful response", () => {
      statusChangeCallback({ status: "connected" });
      expect(fetchPostsStub.called).to.be.true;
    });

    it("should call hideElement and showElement when given a success response", () => {
      statusChangeCallback({ status: "connected" });
      expect(hideElementStub.calledWith("fb-login")).to.be.true;
      expect(showElementStub.calledWith("loading-fb")).to.be.true;
    });

    it("should post an error message when given a failure response", () => {
      statusChangeCallback({ status: "" });
      expect(fakeElement.innerHTML).to.equal("Please log into this app.");
    });
  });

  describe("fetchPosts", () => {
    // fake the FB api
    window.FB = { api: () => {} };

    const FBAPIStub = sinon.stub(window.FB, "api");
    const callback = () => {};

    it("should be a function", () => {
      expect(fetchPosts).to.be.a("function");
    });

    it("should call FB api with the provided userInfo", () => {
      fetchPosts({ userId: "ABCD", accessToken: "my_token" });
      expect(
        FBAPIStub.calledWith(
          `/ABCD/posts`,
          "get",
          { access_token: "my_token" },
          callback
        )
      );
    });

    FBAPIStub.restore();
  });

  describe("pageResults", () => {
    // fake the FB api
    window.FB = { api: () => {} };

    let FBAPIStub;
    const callback = () => {};
    let hideElementStub;
    let showElementStub;
    let analyseSentimentsStub;

    before(() => {
      FBAPIStub = sinon.stub(window.FB, "api");
      hideElementStub = sinon.stub(window, "hideElement");
      showElementStub = sinon.stub(window, "showElement");
      analyseSentimentsStub = sinon.stub(window, "analyseSentiments");
    });

    afterEach(() => {
      FBAPIStub.reset();
      hideElementStub.reset();
      showElementStub.reset();
      analyseSentimentsStub.reset();
    });

    after(() => {
      FBAPIStub.restore();
      hideElementStub.restore();
      showElementStub.restore();
      analyseSentimentsStub.restore();
    });

    it("should be a function", () => {
      expect(pageResults).to.be.a("function");
    });

    it("should push its messages into the userPosts array", () => {
      pageResults({
        data: [{ message: "hello!", created_time: "now!" }],
        paging: {}
      });
      expect(userPosts.length).to.equal(1);
    });

    it("should hide and show elements on page correctly", () => {
      pageResults({
        data: [{ message: "hello!", created_time: "now!" }],
        paging: {}
      });
      expect(hideElementStub.calledWith("loading-fb")).to.be.true;
      expect(showElementStub.calledWith("done-fb")).to.be.true;
      expect(showElementStub.calledWith("loading-google")).to.be.true;
    });

    it("should load the next page when available", () => {
      pageResults({
        data: [{ message: "hello!", created_time: "now!" }],
        paging: { next: "next-page" }
      });

      expect(FBAPIStub.calledWith(`next-page`, "get", null, callback));
    });

    it("should call analyseSentiments after 200 posts have been downloaded", () => {
      userPosts = new Array(200);
      pageResults({
        data: [{ message: "hello!", created_time: "now!" }],
        paging: { next: "next-page" }
      });

      expect(FBAPIStub.called).to.be.false;
      expect(analyseSentimentsStub.calledWith(userPosts)).to.be.true;
    });

    it("should call analyseSentiments when all results have been paged", () => {
      pageResults({
        data: [{ message: "hello!", created_time: "now!" }],
        paging: {}
      });

      expect(FBAPIStub.called).to.be.false;
      expect(analyseSentimentsStub.calledWith(userPosts)).to.be.true;
    });
  });
});
