import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/order" element={<OrderPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
