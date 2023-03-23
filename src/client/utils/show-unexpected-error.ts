import { getElement } from "./get-element";

export const showUnexpectedError = () => {
  return getElement<HTMLDivElement>("#unexpected-error").classList.remove(
    "hidden"
  );
};
