import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import { useRouter } from "next/router";
import axios from "axios";
import { CommentApiResponse } from "@/interface";
import { useQuery } from "react-query";
import { CommentsProps } from ".";

export default function Comments({ storeId }: CommentsProps) {
  const { status } = useSession();
  const router = useRouter();
  const { page = "1" }: any = router.query;

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments
      ?storeId=${storeId}
      &limit=10
      &page=${page}`,
    );

    return data as CommentApiResponse;
  };

  const { data: comments } = useQuery(`comments-${storeId}`, fetchComments);

  return (
    <div className="mx-auto px-2 py-8 md:max-w-2xl">
      <div className="flex flex-col space-y-4 ">
        {status === "authenticated" && <CommentForm storeId={storeId} />}
      </div>
      <div className="my-10">
        {comments?.data?.length > 0 ? (
          ""
        ) : (
          <div className="border p-4 text-center text-sm font-semibold text-gray-500">
            댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
