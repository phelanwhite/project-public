import { images } from "@/assets/constants/image";
import InputField from "@/components/form/InputField";
import Loader from "@/components/form/Loader";
import axiosConfig from "@/configs/axios-config";
import { useIdolStore } from "@/stores/idol-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const IdolCreateAndUpdatePage = () => {
  const { addIdol, updateIdolById } = useIdolStore();

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
        return await updateIdolById(id as string, formData);
      } else {
        return await addIdol(formData);
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
    name: "",
    other_name: [],
    avatar_url: "",
    dob: "",
    measurements: "",
    cup: "",
    height: "",
    nationality: "",

    debut_at: "",
    retire: "",
    keywords: "",
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

  const getIdolByIdResult = useQuery({
    queryKey: ["idol", id],
    queryFn: async () => {
      const url = `idol/get-id/${id}`;
      const response = await axiosConfig.get(url);
      return response;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (getIdolByIdResult.data) {
      Object.entries(formValue).forEach((item) => {
        setFormValue((prev) => ({
          ...prev,
          [item?.[0]]: getIdolByIdResult.data?.data?.[item?.[0]],
        }));
      });
    }
  }, [getIdolByIdResult.data]);

  if (addUpdateResult.isPending || getIdolByIdResult.isLoading)
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
        <label htmlFor="file" className="w-max cursor-pointer mx-auto">
          <div className="aspect-square w-24 h-24 overflow-hidden rounded-full border">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : formValue.avatar_url
                  ? formValue.avatar_url
                  : images.account_notfound
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
          required
          lable="Name"
          name="name"
          value={formValue.name}
          onChange={handleChangeInput}
        />
        {/* <InputField
          lable="Other Name"
          name="other_name"
          value={formValue.other_name}
          onChange={handleChangeInput}
        /> */}
        <InputField
          type="date"
          lable="Date of Birth"
          name="dob"
          value={formValue.dob}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Measurements"
          name="measurements"
          value={formValue.measurements}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Cup"
          name="cup"
          value={formValue.cup}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Height"
          name="height"
          value={formValue.height}
          onChange={handleChangeInput}
        />
        <InputField
          lable="Nationality"
          name="nationality"
          value={formValue.nationality}
          onChange={handleChangeInput}
        />
        <button className="rounded px-4 py-2 bg-blue-500 hover:bg-blue-600 transition text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default IdolCreateAndUpdatePage;
