import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ShortenForm() {
  const [longUrl, setLongUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!longUrl) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      const response = await axios.post(
        `${proccess.env.REACT_APP_API_SHORTENER_URI}/shorten`,
        {
          originalUrl: longUrl,
          expiry,
        }
      );

      setShortUrl(response.data.shortUrl);
      toast.success("Short URL created!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>URL Shortener</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="url"
          placeholder="Paste your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Expiry (e.g. 30m or 2h)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div style={styles.result}>
          <span style={styles.resultLabel}>Shortened URL:</span>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.shortUrl}
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: "480px",
    margin: "4rem auto",
    padding: "2rem",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: "1.75rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: "#111827",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#3b82f6", // modern blue
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  result: {
    marginTop: "2rem",
    textAlign: "center",
    wordBreak: "break-all",
  },
  resultLabel: {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#374151",
  },
  shortUrl: {
    fontSize: "16px",
    color: "#2563eb",
    textDecoration: "none",
  },
};

export default ShortenForm;
