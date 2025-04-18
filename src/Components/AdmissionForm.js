import React, { useState } from "react";
import galleryExhibits from "./galleryExhibits";
// import { useNavigate } from "react-router-dom";

const AdmissionForm = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    galleryName: "",
    otherGallery: "",
    exhibitName: "",
    otherExhibit: "",
    exhibitProblem: "",
    concernSection: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final values
    // const finalGallery =
    //   formData.galleryName === "Other" ? formData.otherGallery : formData.galleryName;
    // const finalExhibit =
    //   formData.exhibitName === "Other" ? formData.otherExhibit : formData.exhibitName;

    // // Exhibit Code Logic
    // const selectedExhibit = galleryExhibits[formData.galleryName]?.find(
    //   (exhibit) => exhibit.name === formData.exhibitName
    // );
    // const exhibitCode = selectedExhibit?.code || "NaN";

    // const dataToSend = {
    //   galleryName: finalGallery,
    //   exhibitName: finalExhibit,
    //   exhibitCode,
    //   exhibitProblem: formData.exhibitProblem,
    //   concernSection: formData.concernSection,
    // };

    try {
      const res = await fetch("https://complaint-generator-nscd-1.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Complaint submitted successfully!");
        setFormData({
          galleryName: "",
          otherGallery: "",
          exhibitName: "",
          otherExhibit: "",
          exhibitProblem: "",
          concernSection: "",
        });
      } else {
        alert("Failed to submit complaint.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-blue-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-4 bg-white shadow-xl rounded-2xl"
      >
        <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">
          Complaint Generator Form
        </h2>

        {/* Gallery Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Gallery Name</label>
          <select
            name="galleryName"
            value={formData.galleryName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Gallery --</option>
            {Object.keys(galleryExhibits).map((gallery, index) => (
              <option key={index} value={gallery}>
                {gallery}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.galleryName === "Other" && (
          <div className="mt-2">
            <input
              type="text"
              name="otherGallery"
              placeholder="Enter gallery name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              value={formData.otherGallery}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Exhibit Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Exhibit Name</label>
          <select
            name="exhibitName"
            value={formData.exhibitName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={!formData.galleryName}
          >
            <option value="">-- Select Exhibit --</option>
            {formData.galleryName &&
              galleryExhibits[formData.galleryName]?.map((exhibit, index) => (
                <option key={index} value={exhibit.name}>
                  {exhibit.name}
                </option>
              ))}
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.exhibitName === "Other" && (
          <div className="mt-2">
            <input
              type="text"
              name="otherExhibit"
              placeholder="Enter exhibit name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              value={formData.otherExhibit}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Problem Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Exhibit Problem</label>
          <input
            type="text"
            name="exhibitProblem"
            value={formData.exhibitProblem}
            onChange={handleChange}
            placeholder="Enter problem details"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Concern Section */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Concern Department</label>
          <select
            name="concernSection"
            value={formData.concernSection}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Department --</option>
            <option value="Art Section">Art Section</option>
            <option value="Electrical Section">Electrical Section</option>
            <option value="Electronics Section">Electronics Section</option>
            <option value="Computer Section">Computer Section</option>
            <option value="Civil Section">Civil Section</option>
            <option value="Mechanical Section">Mechanical Section</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white transition-all duration-300 bg-blue-500 rounded-xl hover:bg-blue-600"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
