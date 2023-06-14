import React from "react";
import styled from "styled-components";
import AddTask from "./AddTask";
import Task from "./Task";
import { kanbanState } from "./atoms";
import { useRecoilValue } from "recoil";

const TodoLayout = styled.section`
  display: "flex";
  flex-direction: "column";
  align-items: start;
  justify-content: space-around;
  width: 100%;
  width: 30rem;
  border-radius: 0.75rem;
  background-color: #e2e8f0;
  margin:0rem 3rem 0rem 3rem;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

const TodoHeader = styled.header`
  width: 100%;
  height: 6rem;
  display: flex;
  padding: 0.5rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #4aa77d;
  border-radius: 0.75rem 0.75rem 0 0;
`;

const HeaderTitle = styled.h1`
  color: white;
  font-weight: 800;
  font-size: xx-large;
  text-transform: uppercase;
`;

const TodoMain = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  align-items: center;
  justify-content: start;
  margin-bottom: 1px;
`;

const TodoListContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;

const TodoFooter = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: solid;
  border-top-color: #a4a4a4;
  border-top-width: thin;
`;

interface IBoardProps {
  categoryName: string;
  categoryIndex: number;
}


const Board: React.FC<IBoardProps> = ({categoryName, categoryIndex}) => {
  const taskList = useRecoilValue(kanbanState)
  const targetList = taskList.filter((taskList) => taskList.category.categoryIndex === categoryIndex)
  return (
    <TodoLayout>
      <TodoHeader>
        <HeaderTitle>{categoryName}</HeaderTitle>
      </TodoHeader>
      <TodoMain>
        <TodoListContainer>
          {targetList.length > 0 &&
            targetList.map((target) => {
              return (
                <Task task={target.task} id={target.id} category={target.category} />
              );
            })}
        </TodoListContainer>
      </TodoMain>
      <TodoFooter>
        <AddTask categoryName={categoryName} categoryIndex={categoryIndex} />
      </TodoFooter>
    </TodoLayout>
  );
};

export default Board;
