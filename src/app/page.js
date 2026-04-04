import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins']">
      
      {/* --- HERO SECTION --- */}
      <header className="relative text-center shadow-lg bg-[linear-gradient(135deg,#000428_0%,#004e92_100%)] text-white pt-24 pb-36 rounded-b-[50px]">
        <div className="container mx-auto px-6">
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-[0.8rem] uppercase tracking-wider mb-3">
            v2.0 Beta - Digital Report Access
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Your Health, <span className="text-[#00d2ff]">Stored Securely.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg opacity-75 mb-8">
            UltraLab connects laboratories and patients instantly. Access your medical reports anytime, anywhere without the wait.
          </p>
        </div>
      </header>

      {/* --- OVERLAPPING CARDS SECTION --- */}
      <div className="container mx-auto px-6 relative z-10 -mt-24"> 
  {/* Added -mt-24 and z-10 to make sure they float properly */}
  <div className="flex flex-wrap justify-center gap-8">
    
    {/* Patient Card */}
    <div className="w-full md:w-[450px]">
      <div className="bg-white p-10 rounded-[30px] shadow-xl text-center h-full hover:-translate-y-3 transition-all duration-300 border border-slate-100">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">📄</div>
        <h3 className="text-2xl font-bold mb-4 text-slate-800">For Patients</h3>
        <p className="text-slate-500 mb-8">Access and download your reports instantly.</p>
        <Link href="/myreports" className="btn-primary-custom inline-block border-2 border-[#004e92] text-[#004e92] hover:bg-[#004e92] hover:text-white px-8 py-3 rounded-xl font-bold">
          Get My Report
        </Link>
      </div>
    </div>

    {/* Admin Card */}
    <div className="w-full md:w-[450px]">
      <div className="bg-white p-10 rounded-[30px] shadow-xl text-center h-full hover:-translate-y-3 transition-all duration-300 border border-slate-100">
        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">⚡</div>
        <h3 className="text-2xl font-bold mb-4 text-slate-800">Laboratory Admin</h3>
        <p className="text-slate-500 mb-8">Securely upload reports to the cloud.</p>
        <Link href="/login" className="inline-block bg-[#004e92] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#003366] shadow-lg">
          Upload Section
        </Link>
        {/* 2. ADD THIS SECURITY NOTICE HERE */}
         <p className="text-[10px] text-slate-400 mt-3 uppercase tracking-wider font-semibold">
         🔒 SECURE ADMIN ACCESS REQUIRED
         </p>
      </div>
    </div>

  </div>
</div>

      {/* --- TRUST BADGES --- */}
      <div className="container mx-auto px-6 mt-20 py-12 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
          <h5 className="text-xl font-semibold text-slate-700 uppercase tracking-widest">Safe & Encrypted</h5>
          <h5 className="text-xl font-semibold text-slate-700 uppercase tracking-widest">Cloud-Based Delivery</h5>
          <h5 className="text-xl font-semibold text-slate-700 uppercase tracking-widest">24/7 Access</h5>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-400 border-t border-slate-200 mt-12">
        <p>© 2026 UltraLab Digital Systems | Built by Anmol Kamalapuri</p>
      </footer>

    </div>
  );
}