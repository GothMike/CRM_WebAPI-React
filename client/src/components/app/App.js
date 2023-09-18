import Sidebar from "../sidebar/Sidebar";
import SearchPanel from "../searchPanel/SearchPanel";

import "../../styles/index.scss";

const App = () => {
  return (
    <div className="App">
      <Sidebar />
      <SearchPanel />
    </div>
  );
};

export default App;
