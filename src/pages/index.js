import { useState } from "react";

function Like({ title, onDelete }) {
  const [likes, setLikes] = useState(0);

  return (
    <li style={{ marginBottom: "10px" }}>
      {title} — 
      <button onClick={() => setLikes(likes + 1)}>👍 Like {likes}</button>
      <button onClick={onDelete} style={{ marginLeft: "10px", color: "red" }}>
        ❌ Delete
      </button>
    </li>
  );
}

// defines a react component called Home
export default function Home() {
  // useState is a hook that let components have state variables(remember values between function calls)

  const [name, setName] = useState(""); // start empty string
  const [books, setBooks] = useState([
    { title: "Atomic Habits", likes: 0 },
    { title: "The Pragmatic Programmer", likes: 0 },
    { title: "Clean Code", likes: 0 },
    { title: "Ayam", likes: 0 }
  ]);
  const [newBook, setNewBook] = useState(""); // for new book input

  const addBook = () => {
    if (newBook.trim() === "") return; // prevent adding empty book titles
    setBooks([...books, newBook]); // add new book to books array
    setNewBook(""); // clear input field
  };

  // Delete book by index
  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
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
                <Like key={index} title={book.title} likes={book.likes} onDelete={() => deleteBook(index)} /> // pass title and onDelete function as props
       
              ))}
            
          </ul>
        </div>
    </div>

    
  );
}