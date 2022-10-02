import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>
        <ul className="flex space-x-4 place-content-center">
          <li>
            <a href={`number`}>Number</a>
          </li>
          <li>
            <a href={`labels`}>Labels</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
