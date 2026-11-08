//This componets will have a Todo list as a prop
// Then we will map it into several TodoCards
import type { TodosContainerProps } from "./TodoApp";
import TodoCard from "./TodoCard";
export default function TodosContainer({
  todosList,
  handleOnTodoCheck,
  handleDeleteTodo,
  handleEditTodo
}: TodosContainerProps) {
  return (
    <div>
      {todosList.length > 0 || "Todo List is empty"}
      {todosList.map((todo) => (
        <TodoCard
          key={todo.id}
          {...todo}
          handleTodoCheck={handleOnTodoCheck}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      ))}
    </div>
  );
}
