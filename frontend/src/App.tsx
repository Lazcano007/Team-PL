import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import OrderPage from "./pages/OrderPage";
import SpinWheel from "./pages/spinWheel";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        <Route path="/spin" element={<SpinWheel />} />
      </Routes>
    </Router>
  );
}

export default App;
