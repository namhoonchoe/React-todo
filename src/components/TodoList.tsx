import React from "react";
import styled from "styled-components";
import CheckBox from "./SvgIcons/CheckBox";
import CheckBoxBlank from "./SvgIcons/CheckBoxBlank";
import MenuIcon from "./SvgIcons/MenuIcon";
import AddTodos from "./AddTodos";
import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector, toDoState } from "./atoms";
import Todo from "./Todo";

const TodoLayout = styled.section`
  display: "flex";
  flex-direction: "column";
  align-items: start;
  justify-content: space-around;
  width: 100%;
  max-width: 65rem;
  margin-top: 8rem;
  border-radius: 0.75rem;
  background-color: #e2e8f0;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`;

const TodoHeader = styled.header`
  width: 100%;
  height: 9rem;
  display: flex;
  padding:0.5rem 0rem ;
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
`;

const TodoFilter = styled.section`
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &:checked {
    border-bottom: solid;
    border-bottom-color: #4aa77d;
    border-bottom-width: large;
  }
`;

const IconContainer = styled.div`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoFilterSelector = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectorTitle = styled.h6`
  color: white;
  font-size: large;
  font-weight: 700;
  text-transform: capitalize;
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

const TodoList: React.FC = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  return (
    <TodoLayout>
      <TodoHeader>
        <HeaderTitle>Todo List</HeaderTitle>
        <TodoFilter>
          <TodoFilterSelector>
            <IconContainer>
              <MenuIcon />
            </IconContainer>
            <SelectorTitle>todo</SelectorTitle>
          </TodoFilterSelector>
          <TodoFilterSelector>
            <IconContainer>
              <CheckBoxBlank />
            </IconContainer>
            <SelectorTitle>doing</SelectorTitle>
          </TodoFilterSelector>
          <TodoFilterSelector>
            <IconContainer>
              <CheckBox />
            </IconContainer>
            <SelectorTitle>Completed</SelectorTitle>
          </TodoFilterSelector>
        </TodoFilter>
      </TodoHeader>
      <TodoMain>
        <TodoListContainer>
          {toDos.length > 0 &&
            toDos.map((toDo) => {
              return (
                <Todo task={toDo.task} id={toDo.id} category={toDo.category} />
              );
            })}
        </TodoListContainer>
      </TodoMain>
      <TodoFooter>
        <AddTodos />
      </TodoFooter>
    </TodoLayout>
  );
};

export default TodoList;
