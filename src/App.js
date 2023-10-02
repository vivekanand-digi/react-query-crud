import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodo from "./components/EditTodo";
import "./App.css";
import "./index.css"

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<TodoList />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/edit/:id" element={<EditTodo />} />
    </Routes>
  );
}

export default App;
