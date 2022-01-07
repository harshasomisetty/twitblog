import Search from "./Search.js";
import AuthorList from "./AuthorList.js";

const RightSideBar = ({displaySearch = true}) => {
  return (
    <div className="sticky top-0 h-screen flex flex-col w-max p-2 rounded-sm hidden lg:block border-l border-gray-500">
      {displaySearch && <Search />}
      <AuthorList />
    </div>
  );
};

export default RightSideBar;
