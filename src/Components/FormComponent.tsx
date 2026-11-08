// This will be a form componets that will have a text input for the to do title
// and a button to submit the todo
// and later it will be used to edit the todos as well.
import type { FormComponentProps } from "./TodoApp";

export default function FormComponents({ title, handleFormOnChange, handleOnSubmit} : FormComponentProps){
   return (
      <div>
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="title">Title</label>
        <input
         type="text" name="title" 
         id="title"
          value={title}
           onChange={handleFormOnChange}/>
        <button>Submit</button>
    </form>
   </div>
   ) ;
}