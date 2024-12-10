import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const UploadParser = () => {
  const [codes, setCodes] = useState([]);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        let workbook;

        if (fileExtension === 'csv') {
          workbook = XLSX.read(data, { type: 'string' });
        } else {
          workbook = XLSX.read(data, { type: 'binary' });
        }

        const sheetName = workbook.SheetNames[0]; // Assuming first sheet
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Extract 'codes' column and update state
        const extractedCodes = jsonData
          .map((row) => row.codes)
          .filter(Boolean); // Remove any null or undefined values

        setCodes(extractedCodes);
        setFileName(file.name);
      };

      reader.readAsBinaryString(file); // Read file as binary for Excel
    }
  };

  return (
    <div>
      <h2>Upload and Parse CSV/Excel File</h2>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      {fileName && <p>Uploaded File: {fileName}</p>}

      {codes.length > 0 && (
        <div>
          <h3>Codes Column Data:</h3>
          <ul>
            {codes.map((code, index) => (
              <li key={index}>{code}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadParser;
