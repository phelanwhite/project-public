import Loader from "@/components/form/Loader";
import Paginate from "@/components/form/paginate";
import useSearchParamsValue from "@/hooks/useSearchParamsValue";
import { useVideoStore } from "@/stores/video-store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "@/components/common/VideoCard";

const VideoPage = () => {
  const { searchParams, handleSearchParams } = useSearchParamsValue();
  const { getVideos, videos } = useVideoStore();
  const getVideosResult = useQuery({
    queryKey: ["videos", searchParams.toString(), videos.length],
    queryFn: async () => {
      return await getVideos(searchParams.toString());
    },
    placeholderData: (previousData) => previousData,
  });

  const [searchVale, setSearchValue] = useState("");

  if (getVideosResult.isLoading) return <Loader />;
  return (
    <div className="space-y-5">
      <div>
        <Link to={`create`}>Create</Link>
      </div>
      <div>
        <input
          className="w-full px-4 py-2 rounded-md border outline-none hover:border-blue-500 focus:ring-blue-500 focus:ring-1"
          placeholder="Search..."
          type="text"
          value={searchVale}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchParams(`_q`, searchVale);
            }
          }}
        />
      </div>
      {searchParams.get("_q") && (
        <div className="font-medium">
          Result: <span>{searchParams.get("_q")}</span>
        </div>
      )}
      {videos.length > 0 ? (
        <>
          <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {videos.map((item: any) => (
              <VideoCard key={item?._id} data={item} />
            ))}
          </div>
          <div>
            <Paginate
              forcePage={Number(getVideosResult.data?.data?.page) - 1}
              pageCount={getVideosResult.data?.data?.totalPages as number}
              onPageChange={(e) => handleSearchParams(`_page`, e.selected + 1)}
            />
          </div>
        </>
      ) : (
        <div className="text-center">No video found.</div>
      )}
    </div>
  );
};

export default VideoPage;
