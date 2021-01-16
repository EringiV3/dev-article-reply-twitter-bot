import { getKeywordFromTweet } from "../utils";

test("getKeywordFromTweet", () => {
  expect(getKeywordFromTweet("@test_id test", "@test_id")).toBe("test");
  expect(getKeywordFromTweet("@test_id \n test", "@test_id")).toBe("test");
  expect(getKeywordFromTweet("@test_id", "@test_id")).toBe("");
  expect(getKeywordFromTweet("@test_id ", "@test_id")).toBe("");
});
