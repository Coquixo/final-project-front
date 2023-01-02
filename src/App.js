import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Welcome from "./containers/Welcome/Welcome.jsx";
import Menu from "./containers/Menu/Menu";
import Profile from "./containers/ProfileView/Profile";
import Balances from "./containers/BalancesView/Balances";
import Transactions from "./containers/TransactionsView/Transactions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
