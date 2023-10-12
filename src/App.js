import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import Activities from "./components/Activities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/activities" element={<Activities />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
