
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("published");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeVideo() {
    if (!url.trim()) {
      setMessage("Por favor, introduce un enlace de YouTube.");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setMessage("Introduce un enlace válido de YouTube.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url,
            video_type: type,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "No se pudo enviar el video.");
      }

      setMessage(data.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Error al conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
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

        <button onClick={analyzeVideo} disabled={loading}>
          {loading ? "Conectando..." : "Analizar video"}
        </button>

        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <h2>Tus clips</h2>
        <p>
          El procesamiento y la creación de clips todavía están pendientes.
        </p>
      </section>

      <footer>AI Viral Clips © 2026</footer>
    </main>
  );
}
