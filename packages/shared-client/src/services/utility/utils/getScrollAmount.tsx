export function getScrollAmount(element: Element | null) {
  if (!element) {
    return 0;
  }
  return element.scrollTop / (element.scrollHeight - element.clientHeight);
}
