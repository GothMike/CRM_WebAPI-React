import Sidebar from "../sidebar/Sidebar";
import SearchPanel from "../searchPanel/SearchPanel";
import DataList from "../dataList/DataList";

import "../../styles/index.scss";

const App = () => {
  return (
    <>
      <div className="App">
        <Sidebar />
        <main className="Main">
          <SearchPanel />
          <DataList />
        </main>
      </div>
    </>
  );
};

export default App;
