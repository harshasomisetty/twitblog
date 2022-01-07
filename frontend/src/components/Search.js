import useSignUpForm from "../hooks/searchHook.js";
import {useNavigate} from "react-router-dom";

import {FaSearch} from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const signup = () => {
    navigate("/author/" + inputs.search_query);
  };

  const {inputs, handleInputChange, handleSubmit} = useSignUpForm(signup);

  return (
    <form id="form" onSubmit={handleSubmit} className="search">
      <button type="submit">
        <FaSearch size="18" className="text-gray-500 font-extralight my-auto" />
      </button>
      <input
        type="search"
        className="search-input"
        name="search_query"
        placeholder="Search Author"
        onChange={handleInputChange}
        value={inputs.search}
      />
    </form>
  );
};

export default Search;
