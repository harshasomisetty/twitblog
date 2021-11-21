import useSignUpForm from "../hooks/searchHook.js";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const signup = () => {
    navigate("/author/" + inputs.search_query);
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(signup);

  return (
    <form id="form" onSubmit={handleSubmit}>
      <input
        type="search"
        name="search_query"
        placeholder="Enter Author Name"
        onChange={handleInputChange}
        value={inputs.search}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
