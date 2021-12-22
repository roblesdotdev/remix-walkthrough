import { Joke } from "@prisma/client";
import { LoaderFunction, useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = { joke: Joke | null };

export const loader: LoaderFunction = async ({ params }) => {
  let data: LoaderData = {
    joke: await db.joke.findUnique({ where: { id: params.jokeId } }),
  };
  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
    </div>
  );
}
