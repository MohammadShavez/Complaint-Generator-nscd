// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-1 gap-8 p-10 md:grid-cols-2">
        {/* Complaint Box */}
        <div
          onClick={() => navigate('/Complaint')}
          className="p-8 text-center transition bg-white shadow-xl cursor-pointer rounded-2xl hover:scale-105"
        >
          <h2 className="mb-4 text-2xl font-bold text-blue-600">Complaint Form</h2>
          <p>Click here to file a new complaint</p>
        </div>

        {/* Admin Panel Box */}
        <div
          onClick={() => navigate('/data')}
          className="p-8 text-center transition bg-white shadow-xl cursor-pointer rounded-2xl hover:scale-105"
        >
          <h2 className="mb-4 text-2xl font-bold text-green-600">See all Complaints</h2>
          <p>Click here to manage complaints</p>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
