import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";

function Posts() {
  const [items, setItems] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setItems(res.data.map((post) => ({ id: post.id, title: post.title })));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask !== "") {
      setItems([...items, { id: items.length + 1, title: newTask }]);
      setNewTask("");
    }
  };

  // Get current posts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="posts-container">
      <h1 className="post-title">Note-Nest</h1>
      <table className="posts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add a new Task</h2>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          className="input-field"
        />
        <button onClick={handleAddTask} className="add-button">
          Add
        </button>
      </div>
      <div className="pagination">
        {[...Array(Math.ceil(items.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`page-button ${
                currentPage === number + 1 ? "active-page" : ""
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Posts;
