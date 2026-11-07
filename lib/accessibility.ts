/** Keep keyboard focus inside an open dialog, including browser chrome Tab boundaries. */
export function trapDialogFocus(
  event: { key: string; shiftKey: boolean; preventDefault: () => void },
  dialog: HTMLElement,
) {
  if (event.key !== "Tab") return;
  const elements = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => el.getClientRects().length > 0);
  const first = elements[0],
    last = elements.at(-1);
  if (!first || !last) {
    event.preventDefault();
    return;
  }
  if (
    event.shiftKey &&
    (document.activeElement === first ||
      !dialog.contains(document.activeElement))
  ) {
    event.preventDefault();
    last.focus();
  } else if (
    !event.shiftKey &&
    (document.activeElement === last ||
      !dialog.contains(document.activeElement))
  ) {
    event.preventDefault();
    first.focus();
  }
}
