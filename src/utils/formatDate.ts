export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
