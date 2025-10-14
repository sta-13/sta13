import Movie from "./Movie";

export default function Category({ name, movies }) {
  return (
    <section className="category">
      <h2 className="category__title">Categoría: {name}</h2>

      <div className="category__row">
        {movies.map((m) => (
          <Movie key={m.title} {...m} />
        ))}
      </div>
    </section>
  );
}
