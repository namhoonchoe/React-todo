import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import AddIcon from "./SvgIcons/AddIcon";
import { kanbanState } from "./atoms";

const FormContainer = styled.section`
  width: 100%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 88%;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormInput = styled.input`
  width: 100%;
  height: 4rem;
  border-radius: 0.75rem;
  margin-right: 0.5rem;
`;

const ButtonContainer = styled.button`
  outline: ghostwhite;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 5rem;
  height: 5rem;
  &:hover {
    background-color: #dcdcdc;
  }
`;

interface IAddTaskProps {
  categoryName: string;
  categoryIndex: number;
}

interface ITask {
  task: string;
}

const AddTasks: React.FC<IAddTaskProps> = ({ categoryName, categoryIndex }) => {
  const setTasks = useSetRecoilState(kanbanState);
  const { register, handleSubmit, setValue } = useForm<ITask>();

  const handleValid = ({ task }: ITask) => {
    setTasks((oldTasks) => [
      {
        task: task,
        id: crypto.randomUUID(),
        category: {
          categoryName,
          categoryIndex,
        },
      },
      ...oldTasks,
    ]);
    setValue("task", "");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(handleValid)}>
        <FormInput
          {...register("task", {
            required: "Please write a Task",
          })}
          placeholder="Write a Task"
        />
        <ButtonContainer type="submit">
          <AddIcon />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default AddTasks;
