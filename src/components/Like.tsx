import { StoreType } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface LikeProps {
  storeId?: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios("/api/stores?id=" + storeId);
    return data as StoreType;
  };

  const { data: store, refetch } = useQuery<StoreType>(
    `like-store-${storeId}`,
    fetchStore,
    {
      enabled: !!storeId,
      refetchOnWindowFocus: false,
    },
  );

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });

        if (like.status === 201) {
          toast.success("가게를 찜했습니다.");
        } else {
          toast.warn("찜을 취소했습니다.");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === "unauthenticated") {
      toast.warn("로그인 후 이용해주세요.");
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {status === "authenticated" && store?.likes?.length ? (
        <AiFillHeart className="text-red-500 hover:text-red-600 focus:text-red-600" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
