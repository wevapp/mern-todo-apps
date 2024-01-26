import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// API endpoit
const TODO_API = import.meta.env.VITE_TODOS_API;

const Home = () => {
  const [todosData, setTodosData] = useState([]); // Variable to handle all Task/todos data
  const [todo, setTodo] = useState(""); // Variable for textfield todo
  const [error, setError] = useState(""); // Handle Error

  // fetch data from serviceAPI
  useEffect(() => {
    axios("https://mern-todo-apps-api.vercel.app").then((res) =>
      setTodosData(res.data)
    );
  }, []);

  // Create new todos
  const handleAdd = async () => {
    // same name from frontend ({todo})to backend (todo)
    axios
      .post("https://mern-todo-apps-api.vercel.app", { todo })
      .then((res) => {
        location.reload();
      })
      .catch((err) => {
        setError(err.response.data);
        setTimeout(() => setError(""), 3000);
      });
  };

  const handleKeydown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  // Delete todo
  const handleDelete = async (dataId) => {
    axios
      .delete("https://mern-todo-apps-api.vercel.app/", dataId)
      .then((res) => {
        location.reload();
      })
      .catch((error) => error.response);
  };

  return (
    <div className="container m-auto flex justify-center items-center">
      <div className="w-[450px] p-2" data-theme="wireframe">
        <div className="text-center mt-4">
          <input
            type="text"
            value={todo}
            placeholder="Add Task"
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(event) => handleKeydown(event)}
            className="input input-bordered input-success w-full max-w-xs font-semibold rounded-none p-3"
          />
        </div>
        <div className="text-center my-1">
          <small className="text-red-600 font-semibold">{error.message}</small>
        </div>
        <div className="text-center my-4">
          <button
            onClick={handleAdd}
            className="btn btn-wide btn-success btn-sm rounded-none text-white"
          >
            + Add
          </button>
        </div>

        {/* Display todo items */}
        <div>
          <div className="border flex justify-between items-center py-2 px-16 font-bold text-info">
            <small>TODO TASK</small>
            <small>ACTION</small>
          </div>
          <ul>
            {todosData.length > 0 &&
              todosData.map((data) => (
                <li
                  key={data._id}
                  className="flex border justify-between items-center font-semibold px-2 my-1 hover:bg-slate-200 text-success"
                >
                  <div>
                    <i className="fa-regular fa-check mx-2"></i>
                    {data.todo}
                  </div>
                  <div className="flex">
                    <div className="px-2 py-1">
                      <Link
                        to={`/edit/${data._id}`}
                        className="btn btn-outline btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="px-2 py-1">
                      <button
                        className="btn btn-outline btn-error btn-sm"
                        onClick={() => handleDelete(data._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
