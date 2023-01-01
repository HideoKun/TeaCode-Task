import { createContext } from "react";

export const DispatchContext = createContext<React.Dispatch<any>>(
  () => {} // ts hack to avoid additional checks for dispatch func in child components
);
