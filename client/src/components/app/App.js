import Sidebar from "../sidebar/Sidebar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DepartmentPage from "../pages/Department/DepartmentPage";
import EmployeePage from "../pages/Employee/EmployeePage";
import PositionPage from "../pages/Position/PositionPage";

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
            <Route path="/position" element={<PositionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
