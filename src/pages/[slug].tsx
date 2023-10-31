import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <h1>Page: {router.query.slug}</h1>

      <div>
        <button
          type="button"
          onClick={() =>
            router.push({ pathname: "/[slug]", query: { slug: "push" } })
          }
        >
          PUSH
        </button>
        <button
          type="button"
          onClick={() =>
            router.replace({ pathname: "/[slug]", query: { slug: "push" } })
          }
        >
          Replace
        </button>
        <button type="button" onClick={() => router.reload()}>
          Reload
        </button>
      </div>
      <div>
        <Link href="/hello">Hello</Link>
      </div>
    </div>
  );
}
