import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryList, categoryState, toDoSelector } from "../atomes";
import AddCategory from "./AddCategory";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const todos = useRecoilValue(toDoSelector);
  const [selectCategory, setCategory] = useRecoilState(categoryState);
  const getCategory = useRecoilValue(categoryList);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as any);
  };
  return (
    <div>
      <h2>Todo Docs</h2>
      <hr />
      <select value={selectCategory} onInput={onInput}>
        {getCategory.map((el, idx) => {
          return (
            <option key={idx} value={el}>
              {el}
            </option>
          );
        })}
      </select>
      <AddCategory />
      <TodoForm />
      {todos?.map((todo) => {
        return <Todo key={todo.id} {...todo} />;
      })}
    </div>
  );
}

export default TodoList;
