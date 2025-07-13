import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [expiry, setExpiry] = useState(""); // in minutes or hours
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      const response = await axios.post("https://url-shortener-api-vzd3.onrender.com/shorten", {
        originalUrl: longUrl,
        expiry, // optional
      });

      setShortUrl(response.data.shortUrl);
      toast.success("Short URL created!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
      />
      <input
        type="text"
        placeholder="Expiry (e.g., 30m or 2h)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
      />
      <button type="submit" style={{ padding: "10px 20px" }}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: "1rem" }}>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </form>
  );
}

export default ShortenForm;
