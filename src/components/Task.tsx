import React, { useState } from "react";
import styled from "styled-components";
import CheckBoxBlank from "./SvgIcons/CheckBoxBlank";
import EditIcon from "./SvgIcons/EditIcon";
import SaveIcon from "./SvgIcons/SaveIcon";
import DeleteIcon from "./SvgIcons/DeleteIcon";
import { useRecoilState } from "recoil";
import { TCategory, kanbanState } from "./atoms";

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

interface ITodo {
  id: string;
  task: string;
  category: TCategory;
}

const Task: React.FC<ITodo> = ({ id, task, category }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");
  const [taskList, setTaskList] = useRecoilState(kanbanState);

  const editTodo = (id: string) => {
    let targetTodo = taskList.find((task) => task.id === id);
    const targetIndex = taskList.findIndex((task) => task.id === id);
    if (targetTodo) {
      targetTodo = { ...targetTodo, task: newTask };
      return setTaskList([
        ...taskList.slice(0, targetIndex),
        targetTodo,
        ...taskList.slice(targetIndex + 1),
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    const newList = taskList.filter((task) => task.id !== id);
    setTaskList(newList);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const editHandler = () => {
    if (newTask !== "") {
      editTodo(id);
      setIsEditing(false);
    }
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

export default Task;
