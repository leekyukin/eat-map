import Link from "next/link";

interface PaginationProps {
  total?: number;
  page: string;
  pathname: string;
}

export default function Pagination({ total, page, pathname }: PaginationProps) {
  return (
    <div className="my-10 flex flex-wrap justify-center gap-3 bg-white py-6 text-black">
      {total <= 10 ? (
        [...Array(total)].map((e, i) => (
          <Link href={{ pathname: pathname, query: { page: i + 1 } }} key={i}>
            <span
              className={`rounded border bg-white px-3 py-2 shadow-sm ${
                i + 1 === parseInt(page, 10)
                  ? "font-bold text-blue-600"
                  : "text-gray-300"
              }`}
              key={i}
            >
              {i + 1}
            </span>
          </Link>
        ))
      ) : (
        <>
          {parseInt(page) > 1 && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span className={`rounded border bg-white px-3 py-2 shadow-sm`}>
                이전
              </span>
            </Link>
          )}
          <Link href={{ pathname: pathname, query: { page: page } }}>
            <span
              className={`rounded border bg-white px-3 py-2 text-blue-600 shadow-sm`}
            >
              {page}
            </span>
          </Link>
          {parseInt(page) < total && (
            <Link
              href={{
                pathname: pathname,
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span className={`rounded border bg-white px-3 py-2 shadow-sm`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
