import ReactLoading from "react-loading";

const Loading = ({ error = "" }) => (
  <div className="flex justify-center items-center">
    {!error ? <ReactLoading type="spokes" /> : <p>{error}</p>}
  </div>
);

export default Loading;
