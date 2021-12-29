import Search from "../components/Search.js";
import AuthorList from "../components/AuthorList.js";

const ExploreView = () => {
  return (
    <div className="flex flex-col s-3">
      <Search />
      <p className="text-center">Advanced Search Coming Soon</p>
      <AuthorList />
    </div>
  );
};

export default ExploreView;
