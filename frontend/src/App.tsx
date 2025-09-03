import Navbar from "./Components/Navbar";
import Button from "./Components/Button";
import OrderForm from "./Components/OrderForm";
import { useState } from "react";
import History from "./Components/History";
import Spin from "./Components/Spin"



function App() { 
  const [page, setPage] = useState<"order" | "spin" | "history">("order");
  
  return (
    <>
      <Navbar current={page} onChange={setPage} />
      {page === "order" && <OrderForm />}
      {page === "spin" && <Spin />}
      {page === "history" && <History />}
    </>
  );
}

export default App;



/// göra om !! DET ÄR FEL!!!! 