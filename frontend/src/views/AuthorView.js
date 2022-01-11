import React, {useState} from "react";
import {getUserLink, sortTypes, Reverse} from "../utils/functions.js";
import Dropdown from "../components/Dropdown.js";
import ThreadList from "../components/ThreadList.js";

export default function AuthorView({authorName, threads}) {
  const [sortType, setSortType] = useState(Object.keys(sortTypes)[4]);
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(false);

  function handleChange(newValue) {
    setSortType(newValue);
    setOpen(!open);
  }

  return (
    <div className="flex flex-col divide-y divide-gray-500">
      <a href={getUserLink(authorName)}>
        <h2 className="sticky top-0 bg-backgroundcol p-4">
          {authorName}: Read {threads.length} Threads
        </h2>
      </a>

      <div className="grid grid-cols-1 py-2">
        <div className="flex flex-row space-x-3 border-b border-gray-700 items-stretch justify-around m-4 p-2">
          <p>Topics: COMING SOON! </p>
          <div className="flex flex-col border-0 space-y-1 space-x-2">
            <Dropdown
              open={open}
              setOpen={setOpen}
              sortType={sortType}
              onChange={handleChange}
            />
            <Reverse reverse={reverse} setReverse={setReverse} />
          </div>
        </div>

        <ThreadList
          threads={threads}
          sortType={sortTypes[sortType]}
          reverse={reverse}
        />
      </div>
    </div>
  );
}
