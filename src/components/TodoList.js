import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddTodo from './AddTodo';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, fetchTodos } from './api/Posts';

function TodoList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchTodos,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <AddTodo />
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left bg-gray-200">Name</th>
            <th className="py-2 px-4 text-left bg-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((todo) => (
            <tr key={todo.id}>
              <td className="py-2 px-4">{todo.name}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => navigate(`/edit/${todo.id}`)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
