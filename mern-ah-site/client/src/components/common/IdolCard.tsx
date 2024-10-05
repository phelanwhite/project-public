import { images } from "@/assets/constants/image";
import { useIdolStore } from "@/stores/idol-store";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../form/Loader";
import { memo } from "react";

const IdolCard = ({ data }: { data: any }) => {
  const { removeIdolById } = useIdolStore();
  const removeIdolByIdResult = useMutation({
    mutationFn: async () => {
      return await removeIdolById(data?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  if (removeIdolByIdResult.isPending) return <Loader />;
  return (
    <div>
      <div className="aspect-9/16 rounded overflow-hidden">
        <img
          src={data?.avatar_url || images.account_notfound}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="font-medium">{data?.name}</div>
      <div className="text-sm">{data?.nationality}</div>
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => removeIdolByIdResult.mutate()}>Delete</button>
        <Link to={`update-id/${data?._id}`}>Update</Link>
      </div>
    </div>
  );
};

export default memo(IdolCard);
