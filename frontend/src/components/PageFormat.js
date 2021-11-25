import { Outlet } from "react-router-dom";

const PageFormat = ({ Title, toAdd }) => (
  <div className="relative border-2 rounded-sm flex-grow flex-col  divide-y divide-gray-700">
    {toAdd && (
      <h2 className="sticky top-0 bg-backgroundcol border-2 p-2">{Title}</h2>
    )}
    <Outlet />
  </div>
);

export default PageFormat;
