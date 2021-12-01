import React, { useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { getUserLink, sortTypes } from "./utils.js";
import Dropdown from "./Dropdown.js";
import ThreadList from "./ThreadList.js";

export default function AuthorDisplay({ authorName, threads }) {
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
        <h2 className="sticky top-0 bg-backgroundcol border-2 p-4">
          {authorName}
        </h2>
      </a>

      <div className="flex flex-row space-x-3 items-stretch justify-around m-4">
        <div className="flex flex-col border-0 p-2">
          <p>Threads: {threads.length}</p>
          {/* <p>Topics: </p> */}
        </div>
        <div className="flex flex-col border-0 p-2">
          <Reverse reverse={reverse} setReverse={setReverse} />
          <Dropdown
            open={open}
            setOpen={setOpen}
            sortType={sortType}
            onChange={handleChange}
          />

          <p>{sortType}</p>
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
          <p>Ascending</p>
          <CgSortZa
            size="25"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      ) : (
        <div className="flex flex-row space-x-1">
          <p>Descending</p>

          <CgSortAz
            size="25"
            className="text-gray-500 font-extralight my-auto"
          />
        </div>
      )}
    </button>
  );
}
