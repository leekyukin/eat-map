import { ErrorMessage } from "@/components/ErrorMessage";
import Loading from "@/components/Loader/Loading";
import Pagination from "@/components/Pagenation";
import Store from "@/components/Store/Store";
import { LikeApiResponse, LikeType } from "@/interface";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery, useQueryErrorResetBoundary } from "react-query";

export default function LikesPage() {
  const router = useRouter();
  const { page = "1" } = router.query;

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?limit=10&page=${page}`);
    return data as LikeApiResponse;
  };

  const {
    data: likes,
    isLoading,
    isError,
  } = useQuery(`likes-${page}`, fetchLikes);

  if (isError) {
    <ErrorMessage message="다시 시도해주세요." />;
  }

  console.log("this is data: ");
  console.log(likes);

  return (
    <div className="mx-auto px-4 py-8 md:max-w-4xl">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-sm text-gray-500">찜한 가게 리스트입니다.</div>
      <ul role="list" className="mt-10 divide-y divide-gray-100">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data?.map((like: LikeType, index) => (
            <Store store={like.store} key={index} />
          ))
        )}
      </ul>
      {likes?.totalPage && likes?.totalPage > 0 && (
        <Pagination
          total={likes?.totalPage}
          page={page}
          pathname="/users/likes"
        />
      )}
    </div>
  );
}
