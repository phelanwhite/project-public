import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Tpye = {
  videos: any[];
  addVideo: (data: any) => any;
  removeVideoById: (idolId: string) => any;
  updateVideoById: (idolId: string, data: any) => any;
  getVideos: (query?: string) => any;
};
export const useVideoStore = create<Tpye>()((set) => ({
  videos: [],
  addVideo: async (data) => {
    const url = `video/create`;
    const response = await axiosConfig.post(url, data);
    set({
      videos: [response?.data],
    });
    return response;
  },
  getVideos: async (query = "") => {
    const url = `video/get-all?${query}`;
    const response = await axiosConfig.get(url);
    set({
      videos: response?.data?.results,
    });
    return response;
  },
  updateVideoById: async (idolId, data) => {
    const url = `video/update-id/${idolId}`;
    const response = await axiosConfig.put(url, data);
    set((state) => ({
      videos: state.videos.map((i) =>
        i._id === idolId ? { ...i, ...data } : i
      ),
    }));
    return response;
  },
  removeVideoById: async (idolId) => {
    const url = `video/delete-id/${idolId}`;
    const response = await axiosConfig.delete(url);
    set((state) => ({
      videos: state.videos.filter((i) => i._id !== idolId),
    }));
    return response;
  },
}));
