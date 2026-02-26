import React from "react";
import { NavbarDesktop } from "~/components/templates/Navbar";
import { StatsOverview } from "~/components/templates/Dashboard";
import {AutomationForm} from "~/components/templates/Dashboard";

export function HomeDesktop() {
    return (
        <main>
            <div className="min-h-screen bg-[#F8FAFC]">
                <NavbarDesktop />

            <div className="max-w-[1400px] mx-auto px-6 py-10">
                <header className="mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Dashboard <span className="text-blue-600">Davinci Automation</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">Welcomeback! Lets make viral content today.</p>
                </header>

                <section className="mb-12">
                    <StatsOverview/>
                </section>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                🚀 Buat Konten Baru
                            </h2>
                            <AutomationForm /> 
                        </div>
                    </div>
                    <div className="col-span-4 space-y-6">
                        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
                            <h3 className="font-bold text-lg mb-2">
                                Pro Tip 🔥
                            </h3>
                            <p className="text-indigo-100 text-sm leading-relaxed">
                                Gunakan link Google Drive dengan akses &quot; Anyone with the link &quot; agar AI bisa memproses video lebih cepat.
                            </p>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-4">
                                Butuh Bantuan?
                            </h3>
                            <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-medium hover:bg-slate-100 transition">
                                Lihat Tutorial Video
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
    );
}
