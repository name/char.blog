import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("/");
};

export default function CatchAllRoute() {
  return null;
}
