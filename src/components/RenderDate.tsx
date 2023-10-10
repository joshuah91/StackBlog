export const renderDate = (date: any) => {
  const d = new Date(date);
  const dd = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return dd;
};
