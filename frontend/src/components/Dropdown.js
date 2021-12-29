import { IoIosArrowDropdownCircle } from "react-icons/io";
import { sortTypes } from "../utils/functions.js";
export default function Dropdown(props) {
  return (
    <div
      tabIndex={1}
      onBlur={(e) => props.setOpen(false)}
      className="focus:outline-none z-50"
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
