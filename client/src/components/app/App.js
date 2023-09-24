import Sidebar from "../sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DepartmentPage from "../pages/DepartmentPage";
import EmployeePage from "../pages/EmployeePage";

import "../../styles/index.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main className="Main">
          <Routes>
            <Route path="/" element={<DepartmentPage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/position" element={<EmployeePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
