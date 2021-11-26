import { FaHome, FaHashtag, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="sticky top-0 h-screen flex flex-col  border-2 rounded-sm p-2 w-24 xl:w-56">
      <SideBarIcon
        icon={<FaTwitter className="transform skew-y-12" size="28" />}
        text="TwitBlog"
      />
      <Link to="/">
        <SideBarIcon icon={<FaHome size="28" />} text="Home" />
      </Link>
      <SideBarIcon icon={<FaHashtag size="28" />} text="Explore" />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡" }) => (
  <div className="relative flex flex-row items-center space-x-3 justify-start h-12 mx-4  my-2 p-2 text-white hover:bg-gray-600 dark:bg-gray-800 rounded-3xl transition-all duration-300 ease-linear cursor-pointer group">
    <div>{icon}</div>
    <p className="hidden xl:block">{text}</p>
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default LeftSideBar;
