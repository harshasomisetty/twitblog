const SearchBox = (props) => {
  return (
    <div>
      <form id="form" onSubmit={props.handleSubmit}>
        <input
          type="search"
          className="search"
          placeholder={props.placeholder}
          onChange={props.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBox;
