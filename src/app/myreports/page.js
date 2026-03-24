"use client";
import { useState } from "react";

export default function PatientPortal() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [reports, setReports] = useState(null); // null means haven't searched yet
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/patients/view-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (!response.ok) throw new Error("Invalid OTP or connection error");

      const data = await response.json();
      setReports(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* 1. Login Section (Shows only if no reports are loaded) */}
        {!reports && (
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Patient Login</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <input 
                type="text" placeholder="Phone Number" 
                className="w-full p-3 border rounded-lg" 
                onChange={(e) => setPhone(e.target.value)} required 
              />
              <input 
                type="password" placeholder="OTP (Demo: 1234)" 
                className="w-full p-3 border rounded-lg" 
                onChange={(e) => setOtp(e.target.value)} required 
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Verify & View</button>
            </form>
          </div>
        )}

        {/* 2. Reports Table (Shows only after successful login) */}
        {reports && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Reports for {phone}</h2>
              <button onClick={() => setReports(null)} className="text-blue-600 hover:underline">Exit</button>
            </div>

            {reports.length === 0 ? (
              <p className="text-center py-10 text-slate-500">No reports found for this number.</p>
            ) : (
              <table className="w-full text-left">
                <thead className="border-b bg-slate-50 text-slate-600 text-sm">
                  <tr>
                    <th className="p-4">Test Type</th>
                    <th className="p-4">Patient</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-4 font-bold">{report.testType}</td>
                      <td className="p-4 text-slate-600">{report.patientName}</td>
                      <td className="p-4 text-right">
                        <a href={report.fileUrl} target="_blank" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200">
                          View PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}