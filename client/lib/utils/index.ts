export const capitalize = (st: string) => {
  const letters = st.toLocaleLowerCase();
  return `${letters.charAt(0).toUpperCase()}${letters.slice(1)}`;
};
