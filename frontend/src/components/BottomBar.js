import {FaHome, FaHashtag, FaTwitter, FaSearch} from "react-icons/fa";
import {Link} from "react-router-dom";

const BottomBar = () => {
  const size = 24;
  return (
    <div className="fixed block sm:hidden bottom-0 inset-x-0 flex flex-row justify-around border-t border-gray-700 p-2 w-screen bg-backgroundcol">
      <div className="hidden sm:block">
        <BottomIcon
          icon={<FaTwitter className="transform skew-y-12" size={size} />}
          text="TwitBlog"
        />
      </div>

      <Link to="/">
        <BottomIcon icon={<FaHome size={size} />} text="Home" />
      </Link>
      <Link to="/explore">
        <BottomIcon icon={<FaSearch size={size} />} text="Explore" />
      </Link>
    </div>
  );
};

const BottomIcon = ({icon, text = "tooltip 💡"}) => (
  // <div className="relative flex flex-row items-center space-x-3 justify-start h-12 mx-4  my-2 p-2 text-white hover:bg-gray-600 dark:bg-gray-800 rounded-3xl">
  <div>{icon}</div>
  // </div>
);

export default BottomBar;
