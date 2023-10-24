// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default function Page({
  number,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>ISR</h1>
      <div>{number}</div>
    </div>
  );
}

export const getStaticProps = (async (context) => {
  const num = await fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain"
  );
  const number = await num.json();
  return { props: { number, revalidate: 5 } };
}) satisfies GetStaticProps<{
  number: number;
}>;
