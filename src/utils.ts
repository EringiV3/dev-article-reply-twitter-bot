export const getKeywordFromTweet = (
  tweetText: string,
  searchText: string
): string => {
  return tweetText.replace(new RegExp(searchText, "g"), "").trim();
};
