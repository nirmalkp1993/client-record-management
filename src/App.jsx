import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import RecordList from "./components/RecordList";
import "./App.css";

const App = () => {
  const [records, setRecords] = useState([]);

  return (
    <div className="container">
      <h1>Client Records Management</h1>
      <FileUpload setRecords={setRecords} records={records} />
      <RecordList records={records} setRecords={setRecords} />
    </div>
  );
};

export default App;