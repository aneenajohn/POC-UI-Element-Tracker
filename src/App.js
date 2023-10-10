import "./main.css";
import { Route, Routes } from "react-router-dom";

import { CreateElements, Elements } from './pages';

export default function App() {
  return (
    <div className="App bg-secondary">
      <Routes>
        <Route path="/" element={<Elements />} />
        <Route path="/create" element={<CreateElements />} />
      </Routes>
    </div>
  );
}
