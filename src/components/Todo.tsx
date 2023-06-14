import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxBlank from "./SvgIcons/CheckBoxBlank";
import EditIcon from "./SvgIcons/EditIcon";
import SaveIcon from "./SvgIcons/SaveIcon";
import DeleteIcon from "./SvgIcons/DeleteIcon";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, toDoState, Categories, IToDo } from "./atoms";

const CardLayout = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 6rem;
  background-color: white;
  border-bottom: solid;
  border-bottom-color: #a4a4a4;
  border-bottom-width: thin;
  position: relative;
  padding: 0 1.5rem;
  &:last-child {
    border-bottom: none;
  }
`;

const EditFormContainer = styled.section`
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EditForm = styled.form`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
`;
const EditInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
`;

const TaskTitle = styled.p`
  font-size: large;
  font-weight: 500;
  text-transform: capitalize;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.button`
  outline: ghostwhite;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 4rem;
  height: 4rem;
  &:hover {
    background-color: #d0d2d6;
  }
`;

const Todo: React.FC<IToDo> = ({ id, task, category }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [todoState, setTodoState] = useRecoilState(toDoState);

  const editTodo = (id: string) => {
    let targetTodo = todoState.find((todo) => todo.id === id);
    const targetIndex = todoState.findIndex((todo) => todo.id === id);
    if (targetTodo) {
      targetTodo = { ...targetTodo, task: newTask };
      return setTodoState([
        ...todoState.slice(0, targetIndex),
        targetTodo,
        ...todoState.slice(targetIndex + 1),
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    const newList = todoState.filter((todoState) => todoState.id !== id);
    setTodoState(newList);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const editHandler = () => {
    editTodo(id);
    setIsEditing(false);
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    editHandler();
  };

  return (
    <CardLayout>
      {isEditing ? (
        <EditFormContainer>
          <EditForm onSubmit={submitHandler}>
            <EditInput type="text" onChange={changeHandler} />
            <ButtonContainer type="submit">
              <SaveIcon />
            </ButtonContainer>
          </EditForm>
        </EditFormContainer>
      ) : (
        <>
          <ButtonContainer>
            <CheckBoxBlank />
          </ButtonContainer>
          <TaskTitle>{task}</TaskTitle>
          <IconContainer className="iconContainer">
            <ButtonContainer onClick={() => setIsEditing(true)}>
              <EditIcon />
            </ButtonContainer>
            <ButtonContainer onClick={() => deleteTodo(id)}>
              <DeleteIcon />
            </ButtonContainer>
          </IconContainer>
        </>
      )}
    </CardLayout>
  );
};

export default Todo;
