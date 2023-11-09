import Home from "./components/Home";
import Activities from "./components/Activities";
import Redirect from "./components/Redirect";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/redirect" element={<Redirect />} />
        <Route
          path="/activities"
          element={<ProtectedRoute element={<Activities />} />}
        />

        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
