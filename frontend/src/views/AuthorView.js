import React, {useState} from "react";
import {CgSortAz, CgSortZa} from "react-icons/cg";
import {getUserLink, sortTypes} from "../utils/functions.js";
import Dropdown from "../components/Dropdown.js";
import ThreadList from "../components/ThreadList.js";

function Reverse(props) {
  return (
    <button type="button" onClick={() => props.setReverse(!props.reverse)}>
      {props.reverse ? (
        <div className="flex flex-row space-x-1">
          <p className="text-xs">Ascending</p>
          <CgSortZa
            size="15"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-1">
          <p className="text-xs">Descending</p>

          <CgSortAz
            size="15"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      )}
    </button>
  );
}

export default function AuthorView({authorName, threads}) {
  const [sortType, setSortType] = useState(Object.keys(sortTypes)[0]);
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
          {authorName}: {threads.length} Threads
        </h2>
      </a>

      <div className="grid grid-cols-1 divide-y divide-gray-500 gap-4 py-4">
        <div className="flex flex-row space-x-3 items-stretch justify-around m-4 p-2">
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
