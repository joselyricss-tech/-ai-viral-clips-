
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("published");
  const [message, setMessage] = useState("");

  function analyzeVideo() {
    if (!url.trim()) {
      setMessage("Por favor, introduce un enlace de YouTube.");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setMessage("Introduce un enlace válido de YouTube.");
      return;
    }

    setMessage("Enlace recibido. La conexión con el analizador está pendiente.");
  }

  return (
    <main className="container">
      <header className="header">
        <h1>AI Viral Clips</h1>
        <p>Convierte los mejores momentos en clips virales.</p>
      </header>

      <section className="panel">
        <h2>Crear clips virales</h2>

        <label htmlFor="videoType">Tipo de contenido</label>
        <select
          id="videoType"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="published">Video publicado</option>
          <option value="live">Transmisión en vivo</option>
        </select>

        <label htmlFor="videoUrl">Enlace de YouTube</label>
        <input
          id="videoUrl"
          type="url"
          placeholder="Pega aquí el enlace de YouTube"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <button onClick={analyzeVideo}>
          Analizar video
        </button>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <h2>Tus clips</h2>
        <p>Aquí aparecerán los clips cuando conectemos el sistema de procesamiento.</p>
      </section>

      <footer>
        AI Viral Clips © 2026
      </footer>
    </main>
  );
}
