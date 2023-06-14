import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import AddIcon from "./SvgIcons/AddIcon";
import { categoryState } from "./atoms";

const AddBoardLayout = styled.section`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 30rem;
  height: 8rem;
  background-color: #4aa77d;
  border-radius: 0.5rem;
  margin: 0rem 3rem 0rem 3rem;
`;

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
  width: 92%;
  height: 4rem;
  border-radius: 0.75rem;
  margin-right: 0.5rem;
`;

const AddButtonContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.button`
  outline: ghostwhite;
  border-radius: 0.5rem;
  border-color: transparent;
  background-color: transparent;
  width: 5rem;
  height: 5rem;
`;

const ButtonMessage = styled.p`
  text-transform: capitalize;
  color: white;
  font-weight: 600;
  font-size: large;
  text-transform: capitalize;
`;

interface IForm {
  categoryName: string;
}

const AddBoard: React.FC = () => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [categories, setCategories] = useRecoilState(categoryState);
  const handleValid = ({ categoryName }: IForm) => {
    setCategories((oldCategories) => [
      ...oldCategories,
      {
        categoryIndex: categories.length + 1,
        categoryName: categoryName,
      },
    ]);
    setValue("categoryName", "");
    setIsAdding(false);
  };

  return (
    <AddBoardLayout>
      {isAdding ? (
        <FormContainer>
          <Form onSubmit={handleSubmit(handleValid)}>
            <FormInput
              {...register("categoryName", {
                required: "Please write a board name",
              })}
              placeholder="Please write a board name"
            />
            <ButtonContainer type="submit">
              <ButtonMessage>Add </ButtonMessage>
            </ButtonContainer>
          </Form>
        </FormContainer>
      ) : (
        <AddButtonContainer onClick={() => setIsAdding(true)}>
          <ButtonContainer>
            <AddIcon fill="#FFFFFF" />
          </ButtonContainer>
          <ButtonMessage>Add another list</ButtonMessage>
        </AddButtonContainer>
      )}
    </AddBoardLayout>
  );
};

export default AddBoard;
