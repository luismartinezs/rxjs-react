import { Outlet } from "react-router-dom";

const routeList = [
  {
    href: "number",
    label: "Number",
  },
  {
    href: "labels",
    label: "Labels",
  },
  {
    href: "abstraction",
    label: "Abstraction",
  },
  {
    href: "provider",
    label: "Provider Abstraction",
  },
];

export default function Root() {
  return (
    <>
      <nav className="mb-8">
        <ul className="flex space-x-6 place-content-center">
          {routeList.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
