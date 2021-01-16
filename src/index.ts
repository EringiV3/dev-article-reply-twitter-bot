import dotenv from "dotenv";
dotenv.config();
import { client } from "./client";
import { getKeywordFromTweet } from "./utils";

const main = () => {
  const searchText = process.env.TWITTER_BOT_ACCOUNT_ID;
  if (!searchText) return;
  client.stream("statuses/filter", { track: searchText }, (stream) => {
    stream.on("data", (tweet) => {
      console.log({ tweet });

      const keyword = getKeywordFromTweet(tweet.text, searchText);
      if (keyword === "") return;
      const devArticlesTweetText = getDevArticleTweetText(keyword);
      client.post(
        "statuses/update",
        { status: devArticlesTweetText, in_reply_to_status_id: tweet.id_str },
        (error, tweet, response) => {
          if (!error) {
            console.log("ok, reply.");
          }
        }
      );
    });
  });
};

main();
