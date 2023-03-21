export const getElement = (
  selector: string,
  parent: Element | null = null
): Element => {
  const getFrom = null === parent ? document : parent;
  const element = getFrom.querySelector(selector);

  if (null === element) throw new Error("Element not found");

  return element;
};
