export const generateRandomColors = (amount: number) => {
  const colors = [];
  for (let i = 0; i < amount; i++) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    colors.push(randomColor);
  }
  return colors;
};
