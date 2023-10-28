export default function Loading() {
  return (
    <>
      <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md" />
      {[...Array(10)].map((e, i) => (
        <div
          className="w-full h-20 mt-2 bg-gray-200 animate-pulse rounded-md"
          key={i}
        />
      ))}
    </>
  );
}
