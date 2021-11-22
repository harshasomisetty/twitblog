import { FaHome, FaHashtag } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="relative h-screen top-0 left-0 w-16 m-0
      flex flex-col
      bg-primary text-secondary"
    >
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

export default SideBar;
