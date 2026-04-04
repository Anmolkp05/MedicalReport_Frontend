"use client";
import { useState, useEffect } from "react";
mport { useRouter } from "next/navigation";



export default function AdminUpload() {
  const [formData, setFormData] = useState({ name: "", phone: "", testType: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter(); // 3. Initialize the router

    useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      router.push("/login");
    }
  }, [router]);

    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("adminEmail");
      router.push("/"); // Sends you back to the main homepage

    };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); 

    const data = new FormData();
    data.append("file", file);
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("testType", formData.testType);

    try {
     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`, {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setMessage("✅ Report uploaded successfully!");
        setFile(null); 
        // Optional: Reset the form fields here if you want
      } else {
        const errorData = await response.text();
        setMessage(`❌ Upload failed: ${errorData || "Check Backend"}`);
      }
    } catch (err) {
      setMessage("❌ Network Error: Is the Java server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">

        {/* --- LOGOUT BUTTON (Top Right) --- */}
        <button
         onClick={handleLogout}
         className="absolute top-4 right-4 text-[10px] font-bold text-red-500 hover:bg-red-50 px-3 py-1 rounded-full border border-red-100 transition-all shadow-sm"
         >
          LOGOUT 🚪
        </button>

        {/* 1. Header Section */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🏥</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">UltraLab Admin</h2>
          <p className="text-slate-500 text-sm mt-1">Cloud-Based Report Management</p>
        </div>

        {/* 2. Status Message (The Green/Red Box) */}
        {message && (
          <div className={`p-4 mb-6 rounded-xl text-center font-semibold text-sm transition-all animate-in fade-in duration-300 ${
            message.includes("✅") 
              ? "bg-green-50 text-green-700 border border-green-200" 
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        {/* 3. The Form */}
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Patient Full Name</label>
            <input 
              type="text" 
              placeholder="Enter Name"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Phone Number</label>
            <input 
              type="text" 
              placeholder="Enter 10-digit number"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Test Type</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer"
              onChange={(e) => setFormData({...formData, testType: e.target.value})}
              required
            >
              <option value="">Choose test category...</option>
              <option value="Thyroid Profile">Thyroid Profile</option>
              <option value="Full Body Checkup">Full Body Checkup</option>
              <option value="Blood Sugar">Blood Sugar</option>
              <option value="CBC / Lipid Profile">CBC / Lipid Profile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Attach PDF Report</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors group">
              <input 
                type="file" 
                accept="application/pdf"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
                required 
              />
              <div className="text-center">
                <p className="text-sm text-slate-600 font-medium">
                  {file ? `📄 ${file.name}` : "Click to browse or drag PDF"}
                </p>
                <p className="text-xs text-slate-400 mt-1">PDF files only (Max 10MB)</p>
              </div>
            </div>
          </div>

          {/* 4. Action Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${
              loading 
                ? "bg-slate-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300"
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin text-xl">⏳</span>
                Processing...
              </>
            ) : (
              <>🚀 Start Secure Upload</>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Authorized Admin Personnel Only
        </p>
      </div>
    </div>
  );
}