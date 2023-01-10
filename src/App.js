import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import Welcome from "./containers/Welcome/Welcome.jsx";
import Profile from "./containers/ProfileView/Profile";
import Balances from "./containers/BalancesView/Balances";
import Transactions from "./containers/TransactionsView/Transactions";
import AdminView from "./containers/AdminView/AdminView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
