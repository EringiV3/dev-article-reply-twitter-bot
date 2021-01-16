import axios from "axios";

/**
 * ツイートテキストを作成して返します
 * @param keyword 検索文字列
 * @param userId TwitternoユーザーID
 */
export const getDevArticleTweetText = async (
  keyword: string,
  userId: string
): Promise<string | null> => {
  const url = "https://dev.to/api/articles";
  const params = {
    tag: keyword,
    per_page: 3,
  };
  const { data } = await axios.get<GetArticlesResponse>(url, { params });
  if (data.length === 0) return null;
  const tweetText = data.reduce((previousValue, article) => {
    const text =
      previousValue + "\n" + `■ ${article.title}` + "\n" + article.url;
    return getTweetStrCount(text) > 280 ? previousValue : text;
  }, userId);
  if (tweetText === userId) return null;
  return tweetText;
};

/**
 * テキストの文字数を取得します。半角は1文字、全角は2文字としてカウントします。
 * @param str
 */
const getTweetStrCount = (str: string): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    if (
      (chr >= 0x00 && chr < 0x81) ||
      chr === 0xf8f0 ||
      (chr >= 0xff61 && chr < 0xffa0) ||
      (chr >= 0xf8f1 && chr < 0xf8f4)
    ) {
      result += 1;
    } else {
      result += 2;
    }
  }
  return result;
};

type GetArticlesResponse = Article[];

type Article = {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: null | number | string;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: any;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  tag_list: any[];
  tags: string;
  user: object;
};
