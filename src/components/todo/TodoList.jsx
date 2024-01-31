import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import scss from "./TodoList.module.scss";

const url =
  "https://elchocrud.pro/api/v1/f97d23d785acf7e987650b2af89885ed/home";

const TodoList = () => {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleAdd = async () => {
    if (title === "" || image === "" || description === "") {
      alert("please write something");
    } else {
      const newData = {
        title: title,
        image: image,
        description: description,
      };

      const response = await axios.post(url, newData);
      setTodo(response.data);
      setTitle("");
      setImage("");
      setDescription("");
    }
  };

  const getTodos = async () => {
    const response = await axios.get(url);
    setTodo(response.data);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete(`${url}/${id}`);
    setTodo(response.data);
  };

  const deleteAll = async () => {
    const response = await axios.delete(url);
    setTodo(response.data);
  };

  const updateTodo = async (id) => {
    const updatedData = {
      title: editTitle,
      image: editImage,
      description: editDescription,
    };

    const response = await axios.put(`${url}/${id}`, updatedData);
    console.log(response.data);
    getTodos();
    setIsEdit(false);
  };

  const updateTodoValue = (id) => {
    const editedTodo = todo.find((item) => item._id === id);
    setEditTitle(editedTodo.title);
    setEditImage(editedTodo.image);
    setEditDescription(editedTodo.description);
    setEditId(id);
    setIsEdit(!false);
    setTitle("");
    setImage("");
    setDescription("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className={scss.section}>
      <h1 className={scss.h1}>TodoList</h1>
      <div className={scss.header}>
        <input
          className={scss.input}
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className={scss.input}
          type="text"
          placeholder="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          className={scss.input}
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className={scss.handleAdd} onClick={handleAdd}>
          Add
        </button>
        <button className={scss.deleteAll} onClick={deleteAll}>
          delete All
        </button>
      </div>

      <div className={scss.container}>
        {todo.map((item) => (
          <div key={item._id} className={scss.items}>
            <div className={scss.content}>
              {isEdit && editId === item._id ? (
                <>
                  <input
                    className={scss.inputTwo}
                    type="text"
                    placeholder="new title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    className={scss.inputTwo}
                    type="text"
                    placeholder="new image"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                  />
                  <input
                    className={scss.inputTwo}
                    type="text"
                    placeholder="new description"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button
                    className={scss.saved}
                    onClick={() => updateTodo(item._id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className={scss.widget}>
                    <div className={scss.box}>
                      <h3>{item.title}</h3>
                      <img src={item.image} alt={item.title} />
                      <p>{item.description}</p>
                    </div>
                  </div>
                </>
              )}
              <div className={scss.buttons}>
                <button
                  className={scss.deleteButton}
                  onClick={() => deleteTodo(item._id)}
                >
                  Delete
                </button>
                <button
                  className={scss.buttonEdit}
                  onClick={() => updateTodoValue(item._id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
