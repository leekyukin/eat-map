import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default function Page({
  number,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>getServerSideProps</h1>
      <div>{number}</div>
    </div>
  );
}

export const getServerSideProps = (async (context) => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain"
  );
  const number = await num.json();
  return { props: { number } };
}) satisfies GetServerSideProps<{
  number: number;
}>;
