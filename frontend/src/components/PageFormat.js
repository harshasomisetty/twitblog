import { Outlet } from "react-router-dom";

const PageFormat = ({ Title }) => (
  <div className="border-2 rounded-sm flex flex-col overflow-hidden divide-y divide-gray-700">
    <h2 className="p-2">{Title}</h2>
    <Outlet />
  </div>
);

export default PageFormat;
