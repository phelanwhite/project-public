import axiosConfig from "@/configs/axios-config";
import { create } from "zustand";

type Tpye = {
  idols: any[];
  addIdol: (data: any) => any;
  removeIdolById: (idolId: string) => any;
  updateIdolById: (idolId: string, data: any) => any;
  getIdols: (query?: string) => any;
};
export const useIdolStore = create<Tpye>()((set) => ({
  idols: [],
  addIdol: async (data) => {
    const url = `idol/create`;
    const response = await axiosConfig.post(url, data);
    set({
      idols: [response?.data],
    });
    return response;
  },
  getIdols: async (query = "") => {
    const url = `idol/get-all?${query}`;
    const response = await axiosConfig.get(url);
    set({
      idols: response?.data?.results,
    });
    return response;
  },
  updateIdolById: async (idolId, data) => {
    const url = `idol/update-id/${idolId}`;
    const response = await axiosConfig.put(url, data);
    set((state) => ({
      idols: state.idols.map((idol) =>
        idol._id === idolId ? { ...idol, ...data } : idol
      ),
    }));
    return response;
  },
  removeIdolById: async (idolId) => {
    const url = `idol/delete-id/${idolId}`;
    const response = await axiosConfig.delete(url);
    set((state) => ({
      idols: state.idols.filter((idol) => idol._id !== idolId),
    }));
    return response;
  },
}));
