import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IdolPage from "./pages/IdolPage";
import IdolByIdPage from "./pages/IdolByIdPage";
import IdolCreateAndUpdatePage from "./pages/IdolCreateAndUpdatePage";
import VideoPage from "./pages/VideoPage";
import VideoCreateAndUpdatePage from "./pages/VideoCreateAndUpdatePage";

function App() {
  return (
    <div>
      <div className="max-w-[1332px] px-4 w-full mx-auto">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="idol" element={<IdolPage />} />
          <Route path="idol/:id" element={<IdolByIdPage />} />
          <Route path="idol/create" element={<IdolCreateAndUpdatePage />} />
          <Route
            path="idol/update-id/:id"
            element={<IdolCreateAndUpdatePage />}
          />
          <Route path="video" element={<VideoPage />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="video/create" element={<VideoCreateAndUpdatePage />} />
          <Route
            path="video/update-id/:id"
            element={<VideoCreateAndUpdatePage />}
          />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
