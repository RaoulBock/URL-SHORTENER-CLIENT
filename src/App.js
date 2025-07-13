import React from "react";
import ShortenForm from "./ShortenForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>🔗 URL Shortener</h1>
      <ShortenForm />
      <ToastContainer />
    </div>
  );
}

export default App;
