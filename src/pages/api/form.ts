import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";
import { ChatGPTAPI } from "chatgpt";

type Data = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  console.log("body: ", body);

  if (!body.url) {
    return res.status(400).json({ data: "No url provided" });
  }

  const web = await fetch(body.url);
  const html = await web.text();

  const $ = cheerio.load(html);
  $("script").remove();
  $("style").remove();
  let text;
  if (body.url.includes("wikipedia")) {
    $(".mw-editsection").remove();
    $(".reference").remove();
    text = $("#bodyContent")
      .text()
      .replaceAll(/[\n\t]/g, "");
  } else {
    text = $("body").text();
  }
  text = text.substring(0, 2000);
  // TODO: better extract text from other websites

  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
  const prompt =
    "generate questions to test the knowledge on the following article";
  const message = prompt + ": " + text;
  console.log(message);
  const gpt = await api.sendMessage(message);

  res.status(200).json({ data: gpt.text });
}
