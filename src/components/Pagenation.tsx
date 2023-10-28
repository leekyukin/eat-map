import Link from "next/link";

interface PaginationProps {
  total: number;
  page: string;
}

export default function Pagination({ total, page }: PaginationProps) {
  return (
    <div className="flex flex-wrap justify-center py-6 my-10 text-black bg-white gap-3">
      {total <= 10 ? (
        [...Array(total)].map((e, i) => (
          <Link href={{ pathname: "/stores", query: { page: i + 1 } }} key={i}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white ${
                i + 1 === parseInt(page, 10)
                  ? "text-blue-600 font-bold"
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
                pathname: "/stores",
                query: { page: parseInt(page) - 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                이전
              </span>
            </Link>
          )}
          <Link href={{ pathname: "/stores", query: { page: page } }}>
            <span
              className={`px-3 py-2 rounded border shadow-sm bg-white text-blue-600`}
            >
              {page}
            </span>
          </Link>
          {parseInt(page) < total && (
            <Link
              href={{
                pathname: "/stores",
                query: { page: parseInt(page) + 1 },
              }}
            >
              <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
                다음
              </span>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
