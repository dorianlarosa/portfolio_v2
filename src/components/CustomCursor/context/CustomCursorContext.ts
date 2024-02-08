import { createContext } from "react";

export type CursorLookType =
  | "arrow"
  | "link"
  | "arrow-mix-blend-mode"
  | "default";
export type CustomCursorType = {
  type: CursorLookType;
  setType: (type: CursorLookType) => void;
};

const CustomCursorContext = createContext<CustomCursorType>({
  type: "default",
  setType: () => {},
});

export default CustomCursorContext;