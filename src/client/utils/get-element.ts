export const getElement = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);

  if (null === element) throw new Error("Element not found");

  return element;
};
