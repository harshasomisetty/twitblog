import { FaHome, FaHashtag } from "react-icons/fa";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="relative h-screen w-max border-2 rounded-sm flex flex-col">
      <Link to="/">
        <SideBarIcon icon={<FaHome size="28" />} text="Home" />
      </Link>
      <SideBarIcon icon={<FaHashtag size="28" />} text="Explore" />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default LeftSideBar;
