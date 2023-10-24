import { useRouter } from "next/router";

export default function StoreEditPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h1>맛집 수정: {id}</h1>
    </div>
  );
}
