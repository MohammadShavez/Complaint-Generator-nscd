// src/Components/DownloadExcel.js
import React from "react";
import * as XLSX from "xlsx";

const DownloadExcel = ({ filteredComplaints }) => {
  const handleDownloadExcel = () => {
    if (!filteredComplaints || filteredComplaints.length === 0) {
      alert("No complaints to export.");
      return;
    }

    const worksheetData = filteredComplaints.map((complaint, index) => ({
      "Sr. No.": index + 1,
      "Gallery Name": complaint.galleryName,
      "Exhibit Code": complaint.exhibitCode,
      "Exhibit Name": complaint.exhibitName,
      "Problem": complaint.exhibitProblem,
      "Department": complaint.concernSection,
      "Date": new Date(complaint.created_at).toLocaleDateString("en-GB"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");

    XLSX.writeFile(workbook, "Gallery_Complaints_Report.xlsx");
  };

  return (
    <button
      onClick={handleDownloadExcel}
      className="px-6 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600"
    >
      Download Excel
    </button>
  );
};

export default DownloadExcel;
