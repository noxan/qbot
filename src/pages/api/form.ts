import type { NextApiRequest, NextApiResponse } from "next";
import * as cheerio from "cheerio";

type Data = {
  data: string;
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
  const text = $("body").text();

  res.status(200).json({ data: text });
}
