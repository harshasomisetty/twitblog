import {Outlet} from "react-router-dom";

const PageFormat = ({Title, toAdd}) => (
  <div className="relative rounded-sm flex-grow flex-col  divide-y divide-gray-700">
    {toAdd && <h2 className="sticky top-0 bg-backgroundcol p-2">{Title}</h2>}
    <Outlet />
  </div>
);

export default PageFormat;
