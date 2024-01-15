const calculateOptimalLayout = (dimensions) => {
  const sortedDimensions = dimensions.sort((a, b) => b.length * b.height - a.length * a.height);

  const boards = [];
  const scraps = [];

  let currentLeft = 0;
  let columnHeights = [0];

  sortedDimensions.forEach(({ length, height, quantity }) => {
    for (let i = 0; i < quantity; i++) {
      let placed = false;

      for (let j = 0; j < columnHeights.length; j++) {
        const columnHeight = columnHeights[j];

        if (columnHeight + height <= 3630) {
          const top = columnHeight;
          const bottom = top + height;

          boards.push({ length, height, top, bottom, left: currentLeft });
          columnHeights[j] = bottom;

          placed = true;
          break;
        }
      }

      if (!placed) {
        currentLeft += length;
        columnHeights.push(height);
        const top = 0;
        const bottom = height;

        boards.push({ length, height, top, bottom, left: currentLeft });
      }
    }
  });

  return { boards, scraps };
};
export default  calculateOptimalLayout ;