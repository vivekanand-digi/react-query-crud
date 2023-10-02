import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "./api/Posts";


function AddTodo() {
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({});
    },
  });

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      name: e.target.name.value,
    };
    addMutation.mutate(newTodo);
    setName("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-400 p-2 rounded-md mr-2"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
