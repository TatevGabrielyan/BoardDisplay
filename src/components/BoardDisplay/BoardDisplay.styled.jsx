import styled from 'styled-components';
import BoardImage from '../../Images/Board.jpg';

export const Board = styled('div')`
  border: 1px solid black;
  width: -webkit-fill-available;
  overflow: auto;
  height: 3630px;
  position: relative;
  margin: 20px;
  background-image: url(${BoardImage});
  background-size: contain;
  background-position: center;
`;

export const BoardBox = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BoardItem = styled('div')`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: #4caf50;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};

  span {
    color: white;
    font-size: 10px;
  }
`;

export const ScrapItem = styled('div')`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  background-color: red;
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};

  span {
    color: white;
    font-size: 10px;
  }
`;
