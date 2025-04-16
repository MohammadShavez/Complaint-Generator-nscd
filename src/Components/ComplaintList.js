import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DownloadExcel from "./DownloadExcel";


const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [galleryFilter, setGalleryFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await axios.get("https://your-vercel-project.vercel.app/fetchComplaints.php");
      if (Array.isArray(res.data)) {
        setComplaints(res.data);
      } else {
        console.error("Expected an array but got:", res.data);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter complaints based on selected gallery and department
  const filteredComplaints = complaints
    .filter((complaint) => {
      return (
        (galleryFilter === "" || complaint.galleryName === galleryFilter) &&
        (departmentFilter === "" || complaint.concernSection === departmentFilter)
      );
    })
    .sort((a, b) => {
      // Sort first by gallery name, then by concern section
      if (a.galleryName < b.galleryName) return -1;
      if (a.galleryName > b.galleryName) return 1;
      return a.concernSection < b.concernSection ? -1 : 1;
    });

  // Get row color based on department
  const getRowColor = (department) => {
    const colorMap = {
      "Electrical Section": "bg-yellow-200",
      "Mechanical Section": "bg-red-200",
      "Civil Section": "bg-green-200",
      "Computer Section": "bg-blue-200",
      "Electronics Section": "bg-pink-200",
      "Art Section": "bg-purple-200",
    };
    return colorMap[department] || "bg-gray-100";
  };
 


  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF("landscape");
    const title = "Gallery Maintenance Report";
    const date = new Date().toLocaleString();
    const today = new Date().toISOString().split("T")[0];
  
    // Group complaints by gallery name
    const complaintGroups = {};
    filteredComplaints.forEach((complaint) => {
      if (!complaintGroups[complaint.galleryName]) {
        complaintGroups[complaint.galleryName] = [];
      }
      complaintGroups[complaint.galleryName].push(complaint);
    });
  
    // Slightly darker color palette for readability
    const galleryColors = [
      "#f8bbd0", "#bbdefb", "#ce93d8", "#a5d6a7", "#fff176",
      "#ffccbc", "#b39ddb", "#80cbc4", "#fff59d", "#81d4fa"
    ];
  
    let colorIndex = 0;
    let allRows = [];
    let serialNumber = 1; // Starting serial number
  
    Object.entries(complaintGroups).forEach(([galleryName, complaints]) => {
      const fillColor = galleryColors[colorIndex % galleryColors.length];
      colorIndex++;
  
      complaints.forEach((complaint) => {
        allRows.push({
          row: [
            serialNumber++, // Incrementing serial number for each complaint
            complaint.galleryName,
            complaint.exhibitCode,
            complaint.exhibitName,
            complaint.exhibitProblem,
            complaint.concernSection,
            new Date(complaint.created_at).toLocaleDateString("en-GB"),
          ],
          fillColor,
        });
      });
    });
  
    // Page Header
    doc.setFontSize(20);
    doc.text(title, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
  
    doc.setFontSize(12);
    doc.text(`Date: ${date}`, doc.internal.pageSize.getWidth() - 10, 15, { align: "right" });
  
    doc.setFontSize(11);
    doc.text(`Total Complaints Today: ${filteredComplaints.length}`, 14, 25);
  
    // Table rendering
    autoTable(doc, {
      startY: 35,
      head: [[
        "Sr. No.", "Gallery Name", "Exhibit Code", "Exhibit Name", "Problem", "Department", "Date"
      ]],
      body: allRows.map(obj => obj.row),
      styles: {
        fontSize: 11,
        cellPadding: 2,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Sr. No. column width
        1: { cellWidth: 40 }, // Gallery column width
        2: { cellWidth: 25 }, // Code column width
        3: { cellWidth: 60 }, // Exhibit column width
        4: { cellWidth: 70 }, // Problem column width
        5: { cellWidth: 30 }, // Department column width
        6: { cellWidth: 25 }, // Date column width
      },
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: "#fff",
        halign: "center",
      },
      didParseCell: function (data) {
        if (data.section === 'body') {
          const index = data.row.index;
          data.cell.styles.fillColor = allRows[index].fillColor;
        }
      },
      didDrawPage: function (data) {
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        doc.setFontSize(10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - 20, pageHeight - 10);
      }
    });
  
    doc.save(`Gallery_Maintenance_Report_${today}.pdf`);
  };
  
  // make TO Excel Sheet
    
  
    // 
  

  // Handle complaint deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await axios.delete("http://localhost/Complaints-projects/api/deleteComplaint.php", {
          data: { id: id },
        });
        fetchComplaints(); // Refresh list
      } catch (error) {
        console.error("Error deleting complaint:", error);
      }
    }
  };

  // Date Method
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleDateString("en-GB"); // Format to DD/MM/YYYY
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-blue-50">
      <div className="max-w-6xl p-6 mx-auto bg-white shadow-xl rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-700">Complaint Records</h1>

        <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
          {/* Filter by Gallery */}
          <select
            value={galleryFilter}
            onChange={(e) => setGalleryFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="">All Galleries</option>
            {[...new Set(complaints.map((complaint) => complaint.galleryName))].map((gallery, index) => (
              <option key={index} value={gallery}>
                {gallery}
              </option>
            ))}
          </select>

          {/* Filter by Department */}
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border rounded-xl"
          >
            <option value="">All Departments</option>
            {[...new Set(complaints.map((complaint) => complaint.concernSection))].map((section, index) => (
              <option key={index} value={section}>
                {section}
              </option>
            ))}
          </select>

          {/* Generate PDF */}
          <button
            onClick={generatePDF}
            className="px-6 py-2 text-white bg-green-500 rounded-xl hover:bg-green-600"
          >
            Generate PDF
          </button>
       

{/* // inside your JSX: */}
          <DownloadExcel filteredComplaints={filteredComplaints} />



        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300">
            <thead className="text-white bg-blue-600">
              <tr>
                <th className="p-2 border">Sr. No.</th>
                <th className="p-2 border">Gallery</th>
                <th className="p-2 border">Code</th>
                <th className="p-2 border">Exhibit</th>
                <th className="p-2 border">Problem</th>
                <th className="p-2 border">Department</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, index) => (
                <tr key={complaint.id} className={`${getRowColor(complaint.concernSection)} text-center`}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{complaint.galleryName}</td>
                  <td className="p-2 border">{complaint.exhibitCode}</td>
                  <td className="p-2 border">{complaint.exhibitName}</td>
                  <td className="p-2 border">{complaint.exhibitProblem}</td>
                  <td className="p-2 border">{complaint.concernSection}</td>
                  <td className="p-2 border">{formatDate(complaint.created_at)}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(complaint.id)}
                      className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredComplaints.length === 0 && (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-600">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintList;
