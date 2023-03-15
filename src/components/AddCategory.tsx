import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryList } from "../atomes";

interface ICategory {
  category: string;
}

function AddCategory() {
  const setCategoryList = useSetRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<ICategory>();

  const appendHandler = ({ category }: ICategory) => {
    setCategoryList((prev) => [...prev, category]);
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(appendHandler)}>
      <input
        {...register("category", {
          required: "please set Category",
        })}
        placeholder=""
      />
      <button>Category Add</button>
    </form>
  );
}

export default AddCategory;
