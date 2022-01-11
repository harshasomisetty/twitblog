import React, {useState} from "react";
import SearchBar from "../components/SearchBar.js";
import AuthorList from "../components/AuthorList.js";
import {getUserLink, sortTypes, Reverse} from "../utils/functions.js";
import ThreadList from "../components/ThreadList.js";

const ExploreView = ({searchTerm, threadData}) => {
  // console.log(threads);
  return (
    <div className="flex flex-col s-3">
      <SearchBar placeHolder={searchTerm} />
      {/* <p className="text-center text-xl p-4">Advanced Search Coming Soon</p> */}
      <div className="block sm:hidden">
        <AuthorList />
      </div>
      <ThreadList
        threads={threadData}
        sortType={Object.values(sortTypes)[4]}
        reverse={false}
        cols={1}
        author={true}
      />
    </div>
  );
};

export default ExploreView;
