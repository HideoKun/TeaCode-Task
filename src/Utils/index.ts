import { filter, map, pipe, prop, propEq, toUpper } from "ramda";
import { Client } from "../Types";

export const getSelectedClientsIds: (data: Client[]) => number[] = pipe(
  filter(propEq("isSelected", true)),
  map(prop("id"))
);

export const getInitials = (...args: string[]) =>
  args.map((s) => s.charAt(0)).map(toUpper);
