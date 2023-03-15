import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryList, ITodo, todoState } from "../atomes";

function Todo({ text, category, id }: ITodo) {
  const getCategory = useRecoilValue(categoryList);
  const setTodos = useSetRecoilState(todoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id);
      const newTodo = { text, id, category: name as any };
      return [
        ...prev.slice(0, targetIndex),
        newTodo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };

  const deleteToDo = () => {
    setTodos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {getCategory
        .filter((cate) => cate !== category)
        .map((el, idx) => {
          return (
            <button key={idx} name={el} onClick={onClick}>
              {el}
            </button>
          );
        })}
      <button onClick={deleteToDo}>Delete</button>
    </li>
  );
}

export default Todo;
