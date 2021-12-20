import { useEffect, useState } from "react";
import "./styles/App.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState<any>("");
  
  const [isEditing, setIsEditing] = useState<any>(false);
  
  const [currentTodo, setCurrentTodo] = useState<any>({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e:any) {
    setTodo(e.target.value);
  }

  
  function handleEditInputChange(e:any) {
    
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  }

  function handleFormSubmit(e:any) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleEditFormSubmit(e:any) {
    e.preventDefault();

    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  function handleDeleteClick(id:any) {
    const removeItem = todos.filter((todo:any) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  
  function handleUpdateTodo(id:any, updatedTodo:any) {
    
    const updatedItem = todos.map((todo:any) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
  
    setTodos(updatedItem);
  }

  
  function handleEditClick(todo:any) {
   
    setIsEditing(true);
    
    setCurrentTodo({ ...todo });
  }

  return (
    <div className="App">
    <div className="header">
      
      {isEditing ? (
         <form onSubmit={handleEditFormSubmit}>
          <h2>Edit Todo</h2>
          <label htmlFor="editTodo">Edit todo: </label>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">Update</button>
           <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleFormSubmit}>
              <div className="inputContainer">
                <h1>What's the Plan for Today...</h1>
              
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="submit">Add</button>
          </div>
        </form>
      )}
        <div className="list">
      <ul className="todo-list">
        {todos.map((todo:any) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => handleDeleteClick(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}
      