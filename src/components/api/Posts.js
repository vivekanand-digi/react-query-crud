export const addTodo = async (newTodo) => {
    await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  };

  export const fetchTodos = async () => {
    const res = await fetch('http://localhost:3000/posts');
    return res.json();
  };
  
  export const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  };

  export const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:3000/posts/${id}`);
    return res.json();
  };

  export const updateTodo = async (updatedTodo) => {
    await fetch(`http://localhost:3000/posts/${updatedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
  };
  