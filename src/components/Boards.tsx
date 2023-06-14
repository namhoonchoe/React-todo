import React from "react";
import { categoryState } from "./atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Board from "./Board";
import AddBoard from "./AddBoard";

const KanbanLayout = styled.section`
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 5rem;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #d7d5d5;
  overflow-x: scroll;
  position: absolute;
  left: 0;
`;

const Boards: React.FC = () => {
  const categories = useRecoilValue(categoryState);
  return (
    <KanbanLayout>
      {categories.map((category) => (
        <Board
          categoryIndex={category.categoryIndex}
          categoryName={category.categoryName}
        />
      ))}
      <AddBoard />
    </KanbanLayout>
  );
};

export default Boards;
