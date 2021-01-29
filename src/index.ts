import dotenv from "dotenv";
dotenv.config();
import { client } from "./client";
import { getKeywordFromTweet } from "./utils";
import { getDevArticleTweetText } from "./devTo";

const main = () => {
  const searchText = process.env.TWITTER_BOT_ACCOUNT_ID;
  if (!searchText) {
    console.error("searchTextが未定義です。");
    return;
  }
  client.stream("statuses/filter", { track: searchText }, (stream) => {
    stream.on("data", async (tweet) => {
      const keyword = getKeywordFromTweet(tweet.text, searchText);
      if (keyword === "") return;
      const devArticlesTweetText = await getDevArticleTweetText(
        keyword,
        `@${tweet.user.screen_name}`
      );
      if (devArticlesTweetText === null) return;
      client.post(
        "statuses/update",
        { status: devArticlesTweetText, in_reply_to_status_id: tweet.id_str },
        (error, tweet, response) => {
          if (error) {
            console.log({ error });
          }
        }
      );
    });
  });
};

main();
