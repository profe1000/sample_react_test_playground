import { useReducer } from "react";
import { initialTodos, reducer } from "./reducers";

// const initialTodos = [
//   {
//     id: 1,
//     title: "Todo 1",
//     complete: false,
//   },
//   {
//     id: 2,
//     title: "Todo 2",
//     complete: false,
//   },
// ];

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "COMPLETE":
//       return state.map((todo) => {
//         if (todo.id === action.id) {
//           return { ...todo, complete: !todo.complete };
//         } else {
//           return todo;
//         }
//       });
//     case "Add": return [
//       ...state,
//       {
//         id: action.id,
//         title: `Todo ${action.id}`,
//         complete: false,
//       },
//     ];
//     default:
//       return state;
//   }
// };

const Todo = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleComplete = (todo) => {
    dispatch({ type: "COMPLETE", id: todo.id });
  };

  const addTodo = () => {
    dispatch({ type: "Add", id: todos.length + 1 });
  };

  return (
    <div className="w3-card-4 w3-white w3-round w3-padding">
      {todos.map((todo) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleComplete(todo)}
            />
            {`Name ${todo.title}  ID ${todo.id} State ${todo.complete} `}
          </label>
        </div>
      ))}

      <button onClick={() => addTodo()}> Add New Todo</button>
    </div>
  );
};

export default Todo;
