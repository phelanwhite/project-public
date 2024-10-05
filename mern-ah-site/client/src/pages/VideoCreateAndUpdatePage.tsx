import { images } from "@/assets/constants/image";
import InputField from "@/components/form/InputField";
import Loader from "@/components/form/Loader";
import axiosConfig from "@/configs/axios-config";
import { useVideoStore } from "@/stores/video-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const VideoCreateAndUpdatePage = () => {
  const { addVideo, updateVideoById } = useVideoStore();

  const addUpdateResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach((item) =>
        formData.append(item?.[0], item[1] as string)
      );
      if (file) {
        formData.append("file", file);
      }
      if (isUpdate) {
        return await updateVideoById(id as string, formData);
      } else {
        return await addVideo(formData);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    thumbnail_url: "",
    video_url: "",
    video_upload_url: "",
    code: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUpdateResult.mutate();
  };

  const location = useLocation();
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    location.pathname.includes(`update-id`)
      ? setIsUpdate(true)
      : setIsUpdate(false);
  }, [location.pathname]);

  const getVideoByIdResult = useQuery({
    queryKey: ["video", id],
    queryFn: async () => {
      const url = `video/get-id/${id}`;
      const response = await axiosConfig.get(url);
      return response;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (getVideoByIdResult.data) {
      Object.entries(formValue).forEach((item) => {
        setFormValue((prev) => ({
          ...prev,
          [item?.[0]]: getVideoByIdResult.data?.data?.[item?.[0]],
        }));
      });
    }
  }, [getVideoByIdResult.data]);

  if (addUpdateResult.isPending || getVideoByIdResult.isLoading)
    return <Loader />;

  return (
    <div>
      <div></div>
      <form
        action=""
        method="post"
        onSubmit={onSubmit}
        className="flex flex-col gap-4"
      >
        <label htmlFor="file" className="w-max cursor-pointer">
          <div className="aspect-video w-24 overflow-hidden rounded border">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formValue.thumbnail_url
                  ? formValue.thumbnail_url
                  : images.thumbnail_notFound
              }
              alt=""
            />
          </div>
          <input
            name="file"
            id="file"
            className="hidden"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
        </label>
        <InputField
          lable="Title"
          name="title"
          value={formValue.title}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Code"
          name="code"
          value={formValue.code}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Video_url"
          name="video_url"
          value={formValue.video_url}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Video_upload_url"
          name="video_upload_url"
          value={formValue.video_upload_url}
          onChange={handleChangeInput}
        />

        <button className="rounded px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VideoCreateAndUpdatePage;
