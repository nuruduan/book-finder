import { useState } from "react";

// BookList component expects a prop called title
// and renders it inside a list item (<li>)
// easier to style or extend later (component reusability)
function BookList({ title }) {
  return <li>{title}</li>;
}

function Like({ title }) {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <p>{title}</p>
      <button onClick={() => setLikes(likes + 1)}>👍Like {likes}</button>
    </div>
  );
}

// defines a react component called Home
export default function Home() {
  // useState is a hook that let components have state variables(remember values between function calls)

  const [name, setName] = useState(""); // start empty string
  const [books, setBooks] = useState([
    "Atomic Habits",
    "The Pragmatic Programmer",
    "Clean Code",
    "Ayam"
  ]);
  const [newBook, setNewBook] = useState(""); // for new book input

  const addBook = () => {
    if (newBook.trim() === "") return; // prevent adding empty book titles
    setBooks([...books, newBook]); // add new book to books array
    setNewBook(""); // clear input field
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Hello, Book Finder!</h1>

      <input
        type="text" // input field
        placeholder="Enter your name" // placeholder text
        value={name} // is name state variable
        onChange={(e) => setName(e.target.value)} // update state
      />

      {/*
      if name is empty, show "stranger"
      if name has value, show name
      */}
      <p>Welcome, {name || "stranger"} 👋</p> 

        <div>
          <h1 style={{ padding: "20px" }}>📚 Book Finder (Demo List)</h1>

          {/* New book input */}
          <input
            type="text"
            placeholder="Add a new book"
            value={newBook}
            onChange={(e) => setNewBook(e.target.value)}
          />
          <button onClick={addBook}>➕ Add Book</button>
          
          <ul style={{ padding: "20px" }}>
            {/*
            books = state variable (array of book titles)
            .map = loop through each book in the array, create a <li> for each book
            key={index} = unique key for each list item (index is the position in the array)
            */}
            
              {books.map((book, index) => (
                <Like key={index} title={book}/>
       
              ))}
            
          </ul>
        </div>

    </div>

    
  );
}