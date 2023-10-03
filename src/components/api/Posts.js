import axios from "axios";

export const addTodo = async (newTodo) => {
    await axios.post("http://localhost:3000/posts",newTodo, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  };

  export const fetchTodos = async () => {
    const res = await axios.get('http://localhost:3000/posts');
    return res.data
  };
  
  export const deleteTodo = async (id) => {
    const response = await axios.delete(`http://localhost:3000/posts/${id}`);
    return response.data
  };

  export const fetchTodo = async (id) => {
    const res = await axios.get(`http://localhost:3000/posts/${id}`);
    return res.data
  };

  export const updateTodo = async (updatedTodo) => {
    await axios.put(`http://localhost:3000/posts/${updatedTodo.id}`, updatedTodo, {
      headers: {
        "Content-Type": "application/json",
      }
    });
  };
  