import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatas } from "./store/actions/action";

import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Home from "./components/Home";

function App() {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.get_data);

  useEffect(() => {
    if (!data) {
      dispatch(getDatas());
    }
  }, [dispatch, data]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#111] text-black dark:text-white">
        <Header />

        <div className="flex-1 min-h-[70vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
