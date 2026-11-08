import { useState, type ChangeEvent, type SubmitEvent } from "react";
import FormComponent from "./FormComponent";
import TodosContainer from "./TodosContainer";

export interface TodoCardProps {
  id: string;
  title: string;
  checked: boolean;
}

export interface TodoCardFunctions extends TodoCardProps {
  handleTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface TodosContainerProps {
  todosList: TodoCardProps[];
  handleOnTodoCheck: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string) => void;
}

export interface FormComponentProps extends TodoCardProps {
  handleFormOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function TodoApp() {
  // states
  //A state to store the input change
  // once the submit button is clicked, the state will be stored
  // as a todo entry in other state thta will save a list of todos

  const [todo, setTodo] = useState<TodoCardProps>({
    id: "",
    title: "",
    checked: false,
  });

  // second state : to store all  the todod entry in one array
  const [tododList, setTodosList] = useState<TodoCardProps[]>([]);

  // handlers
  //1. to handlw a form input change thta will allow typingin the input
  const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prevTodo) => ({ ...prevTodo, [e.target.name]: e.target.value }));
  };

  // 2. to handle tho onsubmit event for the form to add the input to the todo list
  const handleOnSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault(); // to prevent the refresh action from submiting the form
    if (todo.id === "") {
      setTodosList((prevList) => [
        ...prevList,
        {
          id: crypto.randomUUID(),
          title: todo.title,
          checked: false,
        },
      ]);
    } else {
      setTodosList((prevList) =>
        prevList.map((entry) =>
          entry.id === todo.id ? { ...entry, title: todo.title } : { ...entry },
        ),
      );
    }

    setTodo({
      id: "",
      title: "",
      checked: false,
    });
  };

  //3. handle the check box toogle in the todo card
  const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setTodosList((prevList) =>
      prevList.map((entry) =>
        entry.id === id
          ? { ...entry, checked: e.target.checked }
          : { ...entry },
      ),
    );
  };

  //4. handle deleting and entry using the delete button
  const handleDeleteTodo = (id: string) => {
    setTodosList((prevList) => prevList.filter((entry) => entry.id !== id));
  };

  //5. handle editing an entry to change the title
  const handleEditTodo = (id: string) => {
    const todoEntry = tododList.find((entry) => entry.id === id) || {
      title: "",
      id: "",
      checked: false,
    };
    setTodo({ ...todoEntry });
  };

  // main return
  return (
    <div>
      <h1>Todo List App</h1>
      <FormComponent
        {...todo}
        handleFormOnChange={handleFormOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <TodosContainer
        todosList={tododList}
        handleOnTodoCheck={handleTodoCheck}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  );
}
