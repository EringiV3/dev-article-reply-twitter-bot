import Twitter from "twitter";

export const client = new Twitter({
  consumer_key: process.env.TWITTER_COSUMER_KEY ?? "",
  consumer_secret: process.env.TWITTER_COSUMER_SECRET ?? "",
  access_token_key: process.env.TWITTER_TOKEN_KEY ?? "",
  access_token_secret: process.env.TWITTER_TOKEN_SECRET ?? "",
});
