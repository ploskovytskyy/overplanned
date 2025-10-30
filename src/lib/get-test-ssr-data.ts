export const getTestSSRData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    title: "Test SSR Data",
  };
};
