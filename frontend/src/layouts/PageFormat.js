import {Outlet} from "react-router-dom";

const PageFormat = ({Title, toAdd}) => (
  <div className="relative rounded-sm flex-grow flex-col ">
    {toAdd && (
      <h2 className="sticky top-0 bg-backgroundcol p-2 z-50 border-b border-gray-700">
        {Title}
      </h2>
    )}
    <Outlet />
  </div>
);

export default PageFormat;
