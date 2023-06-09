import Head from "next/head";
import {
  Container,
  Heading,
  Input,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    const res = await fetch("/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: evt.target.url.value }),
    });
    const data = await res.json();
    setResponse(data.data);
  };

  return (
    <>
      <Head>
        <title>Qbot</title>
        <meta
          name="description"
          content="Qbot helps you test your knowledge on any website."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Heading pt={12}>Qbot</Heading>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" py={3}>
            <Input
              name="url"
              id="url"
              type="url"
              required
              placeholder="www.example.com"
              defaultValue="https://en.wikipedia.org/wiki/Mount_Price_(British_Columbia)"
            />
            <Button colorScheme="teal" variant="solid" type="submit">
              Submit
            </Button>
          </Stack>
        </form>

        {response && (
          <>
            <Heading as="h2" size="md" py={2}>
              Questions
            </Heading>
            {response.split("\n").map((line: any, index: number) => (
              <Text key={index}>{line}</Text>
            ))}
          </>
        )}
      </Container>
    </>
  );
}
