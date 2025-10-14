import { useState } from "react";

export default function Movie({ title, director, year }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="movie">
      <h3 className="movie__title">{title}</h3>

      {open && (
        <div className="movie__extra">
          <p><strong>Director:</strong> {director}</p>
          <p><strong>Año:</strong> {year}</p>
        </div>
      )}

      <button className="movie__btn" onClick={() => setOpen((v) => !v)}>
        {open ? "Menos información" : "Más información"}
      </button>
    </article>
  );
}
