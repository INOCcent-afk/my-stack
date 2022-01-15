import { ILink } from "../../models/ILink";

export const withAuthNavItems: ILink[] = [
  {
    linkName: "Home",
    href: "/",
  },
  {
    linkName: "Create Post",
    href: "/create-post",
  },
  {
    linkName: "Private Route",
    href: "/private-route",
  },
];

export const noAuthNavItems: ILink[] = [
  {
    linkName: "Login",
    href: "/login",
  },
  {
    linkName: "Register",
    href: "/register",
  },
];
