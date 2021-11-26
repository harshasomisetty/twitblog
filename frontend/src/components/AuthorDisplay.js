import React, { useState } from "react";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { getUserLink } from "./utils.js";

const sortTypes = {
  "Thread Length": "thread_length",
  Likes: "like_count",
  Retweets: "retweet_count",
  Replies: "reply_count",
  Quotes: "quote_count",
  "Oldest Start": "oldest_tweet",
  "Recently Updated": "youngest_tweet",
};

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
        <div className="flex flex-col border-2 p-2">
          <p>Threads: {threads.length}</p>
          {/* <p>Topics: </p> */}
        </div>
        <div className="flex flex-col border-2 p-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 m-5 overflow-auto scrollbar-hide">
        {sortThreads().map((thread, ind) => (
          <div
            key={thread["_id"]}
            className="relative flex flex-row gap-2 items-center rounded border-2 border-gray-600 p-4 "
          >
            <div className="border-2 border-gray-700">
              <p>{ind + 1}</p>
            </div>
            <div className="border-2 border-gray-700">
              <Link to={`/thread/${thread["_id"]}`}>
                <p>length: {thread.statistics.thread_length}</p>
                <p>likes: {thread.statistics.like_count}</p>
                <p>keyWords: {thread.keywords[0]}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
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

function Dropdown(props) {
  return (
    <div
      tabIndex={1}
      onBlur={(e) => props.setOpen(false)}
      className="focus:outline-none"
    >
      <button
        type="button"
        onClick={() => props.setOpen(!props.open)}
        className="flex flex-row space-x-1"
      >
        <p>Sort Threads</p>

        <IoIosArrowDropdownCircle
          size="18"
          className="text-gray-500 font-extralight my-auto"
        />
      </button>
      {props.open && (
        <div className="absolute flex flex-col bg-backgroundcol rounded border-2 border-white overflow-hidden p-1 shadow-2xl">
          {Object.keys(sortTypes).map((type, i) => (
            <button
              key={i}
              onClick={() => props.onChange(type)}
              className="flex items-start p-2 hover:bg-gray-500 border-2 border-gray-700"
            >
              <p>{type}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
