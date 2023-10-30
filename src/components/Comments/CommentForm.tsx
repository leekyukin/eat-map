import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface CommentFormProps {
  storeId: number;
}

export default function CommentForm({ storeId }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post("/api/comments", {
          ...data,
          storeId,
        });

        console.log(result);

        if (result.status === 200) {
          toast.success("댓글을 달았습니다.");
          resetField("body");
        }
      })}
    >
      {errors?.body?.type == "required" && (
        <div className="text-red-600">필수 입력사항입니다.</div>
      )}
      <textarea
        rows={3}
        placeholder="댓글을 작성해주세요..."
        {...register("body", { required: true })}
        className="block min-h-[120px] w-full resize-none rounded-md border bg-transparent px-4 py-2.5 text-sm
  leading-6 text-black placeholder-gray-500"
      />
      <button className="float-right mt-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
        작성하기
      </button>
    </form>
  );
}
