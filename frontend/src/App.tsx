import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import OrderPage from "./pages/OrderPage";
import SpinWheel from "./pages/spinWheel";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        <Route path="/spin" element={<SpinWheel />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
