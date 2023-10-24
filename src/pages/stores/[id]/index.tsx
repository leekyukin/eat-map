import { useRouter } from "next/router";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  return <h1>Store Detail: {id}</h1>;
}
