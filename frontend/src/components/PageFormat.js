import { Outlet } from "react-router-dom";

const PageFormat = ({ Title }) => (
  <div className="flex flex-col divide-y divide-gray-700">
    <h2>{Title}</h2>
    <Outlet />
  </div>
);

export default PageFormat;
