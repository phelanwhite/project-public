import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link to={`/idol`}>Idol</Link>
        <Link to={`/video`}>Video</Link>
      </div>
    </div>
  );
};

export default HomePage;
