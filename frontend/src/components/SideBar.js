import { FaHome, FaHashtag } from "react-icons/fa";

const SideBar = () => {
  return (
    <div
      className="relative h-screen top-0 left-0 w-16 m-0
      flex flex-col
      bg-primary text-secondary"
    >
      <SideBarIcon icon={<FaHome size="28" />} />
      <SideBarIcon icon={<FaHashtag size="28" />} />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡" }) => (
  <div className="sidebar-icon group">
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

export default SideBar;
