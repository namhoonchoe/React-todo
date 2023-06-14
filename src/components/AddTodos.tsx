import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";
import { styled } from "styled-components";
import AddIcon from "./SvgIcons/AddIcon";

interface IForm {
  toDo: string;
}

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
  height:  5rem;
  &:hover{
    background-color: #DCDCDC;
  }
`

const AddTodos: React.FC = () => {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { task: toDo, id: crypto.randomUUID(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };



  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(handleValid)}>
        <FormInput
          {...register("toDo", {
            required: "Please write a To Do",
          })}
          placeholder="Write a to do"
        />
        <ButtonContainer type="submit">
          <AddIcon />
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default AddTodos;
