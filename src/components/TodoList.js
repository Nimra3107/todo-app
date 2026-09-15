import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-message">No tasks yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;

// import React from "react";
// import TodoItem from "./TodoItem";

// function TodoList({ todos, toggleComplete, deleteTodo, editTodo }) {
//     return (
//         <table className="todo-table">
//             <thead>
//                 <tr>
//                     <th>Complete</th>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Image</th>
//                     <th>Actions</th>
//                 </tr>
//             </thead>

//             <tbody>
//                 {todos.map((todo) => (
//                     <TodoItem
//                         key={todo.id}
//                         todo={todo}
//                         toggleComplete={toggleComplete}
//                         deleteTodo={deleteTodo}
//                         editTodo={editTodo}
//                     />
//                 ))}
//             </tbody>
//         </table>
//     );
// }

// export default TodoList;
