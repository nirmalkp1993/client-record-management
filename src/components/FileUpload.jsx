import React from "react";

const FileUpload = ({ setRecords, records }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const newData = JSON.parse(e.target.result);
          const uniqueRecords = Array.from(
            new Map([...records, ...newData].map((item) => [item.email, item]))
          ).map(([, value]) => value);
          setRecords(uniqueRecords);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept="application/json" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
