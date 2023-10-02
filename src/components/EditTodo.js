import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTodo, updateTodo } from "./api/Posts";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["posts", id], () =>
    fetchTodo(id)
  );
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      ...formData,
    });
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  if (isLoading) return <div className="text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-xl font-semibold">Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          required
          className="border border-gray-400 p-2 rounded-md mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
