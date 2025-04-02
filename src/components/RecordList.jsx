import React, { useState } from "react";

const RecordList = ({ records, setRecords }) => {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const handleDeleteRecord = (email) => {
    setRecords(records.filter((record) => record.email !== email));
  };

  const handleEditRecord = (record) => {
    setEditing(record.email);
    setEditData(record);
  };

  const handleSaveRecord = () => {
    if (records.some((r) => r.email === editData.email && r.email !== editing)) {
      alert("Email must be unique");
      return;
    }
    setRecords(
      records.map((record) => (record.email === editing ? editData : record))
    );
    setEditing(null);
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID, Name, Email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.email}>
              {editing === record.email ? (
                <>
                  <td>{record.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveRecord}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.email}</td>
                  <td>
                    <button onClick={() => handleEditRecord(record)}>Edit</button>
                    <button onClick={() => handleDeleteRecord(record.email)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default RecordList;
