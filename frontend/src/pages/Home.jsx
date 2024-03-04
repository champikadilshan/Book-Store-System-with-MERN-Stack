import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookTable from "../components/Home/BookTable";
import BookCard from "../components/Home/BookCard";
import NavBar from "../components/Home/NavBar";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 min-h-screen p-6 bg-slate-900">

      {/* Nav bar */}
      <NavBar />

      {/* Buttons */}

      <div className="flex justify-center items-center gap-x-4 p-8">
        <button
          className="bg-indigo-800 hover:bg-indigo-400 px-4 py-1 rounded-lg font-normal text-slate-300"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-indigo-800 hover:bg-indigo-400 px-4 py-1 rounded-lg font-normal text-slate-300"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-slate-300">Books List</h1>
        
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
      <Link to="/books/create">
          <MdOutlineAddBox className="text-slate-300 text-4xl my-4 " />
      </Link>
    </div>
  );
}

export default Home;
