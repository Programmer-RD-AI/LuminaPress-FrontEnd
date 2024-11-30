export const formatDate = (dateString) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
