export default function FullPageLoader() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col justify-center bg-black/60">
      <div className="m-auto h-10 w-10 animate-spin rounded-full border-[4px] border-blue-600 border-t-transparent" />
    </div>
  );
}
