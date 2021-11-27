import PageFormat from "../components/PageFormat.js";
import LeftSideBar from "../components/LeftSideBar.js";
import RightSideBar from "../components/RightSideBar.js";

export default function Explore() {
  return (
    <div className="container relative flex flex-row justify-between">
      <LeftSideBar />
      <PageFormat Title="Explore" toAdd={true} />
      <RightSideBar displaySearch={false} />
    </div>
  );
}
