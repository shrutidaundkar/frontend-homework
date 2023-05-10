import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
import Houses from "./components/Houses";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/home" element={<Home />} />

            <Route path="/search" element={<Search />} />

            <Route path="/houses" element={<Houses />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
