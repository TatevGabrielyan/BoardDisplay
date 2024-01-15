import React, { useEffect, useState } from 'react';
import calculateScraps from '../utils/utils';
import * as Styled from './BoardDisplay.styled';

const BoardDisplay = ({ dimensions, boards }) => {
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    const calculatedScraps = calculateScraps(dimensions, boards);
    setScraps(calculatedScraps);
  }, [dimensions, boards]);

  return (
    <Styled.BoardBox>
      <Styled.Board>
        {boards.map((board, index) => (
          <Styled.BoardItem
            key={`board-${index}`}
            width={board.length}
            height={board.height}
            top={board.top}
            left={board.left}
          >
            <span>{board.length}</span>
          </Styled.BoardItem>
        ))}
        {Array.isArray(scraps) && scraps.map((scrap, index) => (
          <Styled.ScrapItem
            key={`scrap-${index}`}
            width={scrap.length}
            height={scrap.height}
            top={scrap.top}
            left={scrap.left}
          >
            <span>{scrap.length}</span>
          </Styled.ScrapItem>
        ))}
      </Styled.Board>
    </Styled.BoardBox>
  );
};

export default BoardDisplay;
