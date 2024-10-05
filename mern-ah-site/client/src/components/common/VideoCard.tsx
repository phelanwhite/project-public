import { images } from "@/assets/constants/image";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loader from "../form/Loader";
import { memo } from "react";
import { useVideoStore } from "@/stores/video-store";

const VideoCard = ({ data }: { data: any }) => {
  const { removeVideoById } = useVideoStore();
  const removeVideoByIdResult = useMutation({
    mutationFn: async () => {
      return await removeVideoById(data?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  if (removeVideoByIdResult.isPending) return <Loader />;
  return (
    <div>
      <div className="aspect-video rounded overflow-hidden">
        <img
          src={data?.thumbnail_url || images.thumbnail_notFound}
          alt=""
          loading="lazy"
        />
      </div>
      <div className="font-medium line-clamp-2">{data?.title}</div>
      <div className="text-sm">{data?.code}</div>
      <div className="flex items-center gap-2 text-sm">
        <button onClick={() => removeVideoByIdResult.mutate()}>Delete</button>
        <Link to={`update-id/${data?._id}`}>Update</Link>
      </div>
    </div>
  );
};

export default memo(VideoCard);
