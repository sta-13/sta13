import "./index.css";
import Category from "./components/Category";
import { CATEGORIES } from "./data/movies";

export default function App() {
  return (
    <div className="page">
      <main className="frame">
        <h1 className="appTitle">Mi app de cine</h1>

        {CATEGORIES.map((c) => (
          <Category key={c.name} name={c.name} movies={c.movies} />
        ))}
      </main>
    </div>
  );
}
