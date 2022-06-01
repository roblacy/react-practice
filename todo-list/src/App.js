import React from 'react';

import './App.css';

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Wash dishes', done: false },
    { id: 2, text: 'Do laundry', done: false },
    { id: 3, text: 'Vacuum house', done: false },
  ]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    setTodos(prevTodos => {
      return prevTodos.map(t => {
        if (t.id === todo.id) {
          return {
            ...t,
            done: !t.done,
          };
        } else {
          return t;
        }
      });
    });
  }

  return (
    <ul>
      {
        todos.map(todo => {
          const className = todo.done ? 'done' : null;
          return (
            <li key={todo.id}>
              <span className={className}>{todo.text}</span>
              <input type="checkbox" id={todo.id} onClick={() => handleToggleTodo(todo)} />
            </li>
          );
        }
        )
      }
    </ul>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAdd(event) {
    event.preventDefault();
    const text = inputRef.current.value;
    const todo = {
      id: null,
      text,
      done: false,
    }
    setTodos(prevTodos => {
      todo.id = prevTodos.length + 1;
      return [...prevTodos, todo];
    });
    inputRef.current.value = '';
  }

  return (
    <form onSubmit={handleAdd}>
      <input name="newTodoName" placeholder="Add todo" type="text" ref={inputRef} ></input>
      <button type="submit">Add</button>
    </form>
  );
}

export default App;
