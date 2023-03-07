import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const postsRef = collection(db, "posts");

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError(true);
    } else {
      await addDoc(postsRef, {
        title,
        description,
        username: user.email,
        userId: user.uid,
      });
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setError(false);
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              setError(false);
              setDescription(e.target.value);
            }}
          />
        </div>
        <button type="submit">Post</button>
      </form>
      {error && "Fields cannot be empty"}
    </div>
  );
};

export default CreatePost;
