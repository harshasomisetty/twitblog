import React, {useState} from "react";
import SearchBar from "../components/SearchBar.js";
import AuthorList from "../components/AuthorList.js";
import {getUserLink, sortTypes, Reverse} from "../utils/functions.js";
import ThreadList from "../components/ThreadList.js";

const ExploreView = ({searchTerm, threadData}) => {
  return (
    <div className="flex flex-col s-3">
      <SearchBar placeHolder={searchTerm} />

      <div className="block sm:hidden">
        <AuthorList />
      </div>

      {threadData.length > 0 ? (
        <ThreadList
          threads={threadData}
          sortType={Object.values(sortTypes)[4]}
          reverse={false}
          cols={1}
          author={true}
        />
      ) : (
        <p className="text-center text-xl">
          {searchTerm ? "No Results" : "Search for Keyword"}
        </p>
      )}
    </div>
  );
};

export default ExploreView;
