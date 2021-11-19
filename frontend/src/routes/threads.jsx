import { Outlet } from "react-router-dom";
export default function Threads() {
  return (
    <div>
      <main style={{ padding: "1rem 0" }}>
        <h2>Thread Page</h2>
      </main>
      <Outlet />
    </div>
  );
}
