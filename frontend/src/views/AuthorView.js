import React, { useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { getUserLink, sortTypes } from "../utils/functions.js";
import Dropdown from "../components/Dropdown.js";
import ThreadList from "../components/ThreadList.js";

export default function AuthorView({ authorName, threads }) {
  const [sortType, setSortType] = useState(Object.keys(sortTypes)[0]);
  const [reverse, setReverse] = useState(false);
  const [open, setOpen] = useState(false);

  function handleChange(newValue) {
    setSortType(newValue);
    setOpen(!open);
  }

  function sortThreads() {
    if (reverse) {
      return threads.sort(
        (a, b) =>
          a.statistics[sortTypes[sortType]] > b.statistics[sortTypes[sortType]]
      );
    } else {
      return threads.sort(
        (a, b) =>
          a.statistics[sortTypes[sortType]] < b.statistics[sortTypes[sortType]]
      );
    }
  }

  return (
    <div className="flex flex-col">
      <a href={getUserLink(authorName)}>
        <div className="flex flex-row sticky top-0 bg-backgroundcol border-2 p-4 items-end space-x-3">
          <h2 className="">{authorName}: </h2>
          <h3>{threads.length} Threads</h3>
        </div>
      </a>

      <div className="flex flex-row space-x-3 items-stretch justify-around m-4">
        <div className="flex flex-col border-0 p-2">
          <p>Topics: COMING SOON! </p>
        </div>
        <div className="flex flex-col border-0 p-2 space-y-1 space-x-2">
          <Dropdown
            open={open}
            setOpen={setOpen}
            sortType={sortType}
            onChange={handleChange}
          />
          <Reverse reverse={reverse} setReverse={setReverse} />
        </div>
      </div>

      <ThreadList threads={sortThreads()} />
    </div>
  );
}

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
