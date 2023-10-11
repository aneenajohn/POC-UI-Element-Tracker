import "./main.css";
import { Route, Routes } from "react-router-dom";

import { CreateElements, Elements } from './pages';
import { Navbar } from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-secondary font-mono flex flex-col h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Elements />} />
        <Route path="/create" element={<CreateElements />} />
      </Routes>
    </div>
  );
}
