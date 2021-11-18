import { Outlet } from "react-router-dom";
export default function Authors() {
  return (
    <div>
      <main style={{ padding: "1rem 0" }}>
        <h2>Author Page</h2>
      </main>
      <Outlet />
    </div>
  );
}
