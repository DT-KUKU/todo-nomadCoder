import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, todoState } from "../atomes";

interface FormType {
  todo: string;
}

function TodoForm() {
  const setTodoList = useSetRecoilState(todoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<FormType>();

  const appendHandler = ({ todo }: FormType) => {
    setTodoList((prev) => [
      { id: Date.now(), category: category, text: todo },
      ...prev,
    ]);
    setValue("todo", "");
  };

  return (
    <form onSubmit={handleSubmit(appendHandler)}>
      <input
        {...register("todo", { required: "please set To do" })}
        placeholder=""
      />
      <button>Add</button>
    </form>
  );
}

export default TodoForm;
