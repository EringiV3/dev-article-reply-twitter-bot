/**
 * ツイートテキストから記事検索に使用する検索文字列を取得します
 * @param tweetText
 * @param searchText
 */
export const getKeywordFromTweet = (
  tweetText: string,
  searchText: string
): string => {
  return tweetText.replace(new RegExp(searchText, "g"), "").trim();
};
