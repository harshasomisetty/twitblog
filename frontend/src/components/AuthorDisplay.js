import React, { useState } from "react";
import { FaSortAmountUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const sortTypes = ["Date", "Likes", "Retweets", "Length"];

export default function AuthorDisplay({ authorName, threads }) {
  const [sortType, setSortType] = useState(sortTypes[0]);
  const [open, setOpen] = useState(false);

  function handleChange(newValue) {
    setSortType(newValue);
    setOpen(!open);
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto scrollbar-hide">
      <h3>{authorName}</h3>
      <NavItem
        icon={
          <FaSortAmountUp
            size="18"
            className="text-gray-500 font-extralight my-auto"
          />
        }
        open={open}
        setOpen={setOpen}
      >
        <Dropdown sortType={sortType} onChange={handleChange} />
      </NavItem>

      <p>{sortType}</p>

      {threads.map((thread) => (
        <div
          key={thread["_id"]}
          className="mx-3 mb-1 rounded border-2 border-gray-600"
        >
          <Link to={`/thread/${thread["_id"]}`}>{thread["keywords"][0]}</Link>
        </div>
      ))}
    </div>
  );
}

function NavItem(props) {
  return (
    <div
      tabIndex={1}
      onBlur={(e) => props.setOpen(false)}
      className="focus:outline-none"
    >
      <button
        type="button"
        onClick={() => props.setOpen(!props.open)}
        className="flex flex-row space-x-3"
      >
        <p>Sort Threads</p>
        <div>{props.icon}</div>
      </button>
      {props.open && props.children}
    </div>
  );
}

function Dropdown(props) {
  return (
    <div className="absolute flex flex-col bg-backgroundcol rounded border-2 border-white overflow-hidden p-1 shadow-2xl">
      {sortTypes.map((type, i) => (
        <button
          key={i}
          onClick={() => props.onChange(type)}
          className="flex items-start p-2 hover:bg-gray-500 border-2 border-gray-700"
        >
          <p>{type}</p>
        </button>
      ))}
    </div>
  );
}
