import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = req.body;

  console.log("body: ", body);

  if (!body.first || !body.last) {
    return res.status(400).json({ data: "First or last name not found" });
  }

  res.status(200).json({ data: `${body.first} ${body.last}` });
}
