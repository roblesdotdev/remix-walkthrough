import { Joke } from "@prisma/client";
import { LoaderFunction, useLoaderData, useParams } from "remix";
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

export function ErrorBoundary() {
  const { jokeId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${jokeId}. Sorry.`}</div>
  );
}
