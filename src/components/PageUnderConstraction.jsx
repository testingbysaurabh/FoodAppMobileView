import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageUnderConstruction() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white p-4">
            <div className="w-[375px] h-[812px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 relative">
                <div className="p-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/home')}
                        aria-label="Back"
                        className="bg-white/80 hover:bg-white text-gray-700 px-3 py-2 rounded-lg shadow-sm"
                    >
                        ←
                    </button>
                    <div className="text-xs text-gray-500">Under Construction</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-6">
                    <div className="w-full flex items-center justify-center mt-4">
                        <div className="scene w-[320px] h-[420px] relative perspective-800">
                            <div className="card absolute inset-0 m-auto w-[300px] h-[380px] rounded-2xl bg-gradient-to-tr from-orange-200 to-orange-400 shadow-2xl transform-gpu will-change-transform animate-card-tilt" />
                            <div className="panel absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[340px] bg-white rounded-2xl shadow-2xl p-5 transform-gpu will-change-transform animate-panel-bounce">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/40 rounded-lg flex items-center justify-center shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
                                            <circle cx="12" cy="12" r="9" stroke="currentColor" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl ">Page Under Construction</h3>
                                        <p className="text-sm text-gray-500">We are building something tasty check back soon!</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-center">
                                    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                                        <defs>
                                            <linearGradient id="g1" x1="0" x2="1">
                                                <stop offset="0" stopColor="#fff7ed" />
                                                <stop offset="1" stopColor="#ffedd5" />
                                            </linearGradient>
                                        </defs>
                                        <rect x="0" y="0" width="160" height="160" rx="20" fill="url(#g1)" />
                                        <circle cx="80" cy="52" r="22" fill="#fff" stroke="#f97316" strokeWidth="2" />
                                        <circle cx="72" cy="50" r="3" fill="#111827" />
                                        <circle cx="88" cy="50" r="3" fill="#111827" />
                                        <path d="M70 60c5 6 15 6 20 0" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                        <path d="M56 78c0 0 8 26 24 26s24-26 24-26" fill="#fff" stroke="#f97316" strokeWidth="2" />
                                        <rect x="60" y="88" width="40" height="24" rx="6" fill="#fb923c" />
                                        <g className="arm-left">
                                            <rect x="36" y="88" width="18" height="8" rx="4" fill="#fecaca" transform="rotate(-20 36 88)" />
                                        </g>
                                        <g className="arm-right">
                                            <rect x="106" y="88" width="18" height="8" rx="4" fill="#fecaca" transform="rotate(20 106 88)" />
                                        </g>
                                        <rect x="110" y="72" width="8" height="28" rx="2" fill="#374151" transform="rotate(20 110 72)" />
                                        <rect x="114" y="96" width="18" height="6" rx="2" fill="#111827" transform="rotate(20 114 96)" />
                                        <g className="sparkles">
                                            <path d="M30 30 L34 38 L42 40 L34 42 L30 50 L28 42 L20 40 L28 38 Z" fill="#fde68a" opacity="0.9" />
                                            <path d="M130 28 L132 34 L138 36 L132 38 L130 44 L128 38 L122 36 L128 34 Z" fill="#fde68a" opacity="0.9" />
                                        </g>
                                    </svg>
                                </div>
                                <div className="mt-20 flex gap-3">
                                    <button onClick={() => navigate('/home')} className="flex-1 py-2 rounded-xl bg-[#d97706] text-white font-semibold text-base cursor-pointer">Go Home</button>
                                    <button onClick={() => alert('Contact support (demo)')} className="py-2 px-3 rounded-xl border text-base cursor-pointer">Contact</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                <style>{`
                  .perspective-800 { perspective: 800px; }
                  .scene { perspective-origin: 50% 40%; }
                  .animate-card-tilt {
                    animation: cardTilt 6s ease-in-out infinite;
                    transform-origin: center;
                  }
                  @keyframes cardTilt {
                    0% { transform: rotateX(6deg) rotateY(-6deg) translateY(0); }
                    50% { transform: rotateX(-6deg) rotateY(6deg) translateY(-6px); }
                    100% { transform: rotateX(6deg) rotateY(-6deg) translateY(0); }
                  }
                  .animate-panel-bounce {
                    animation: panelFloat 3.6s cubic-bezier(.2,.9,.2,1) infinite;
                  }
                  @keyframes panelFloat {
                    0% { transform: translateY(0) translateZ(30px) scale(1); }
                    50% { transform: translateY(-8px) translateZ(36px) scale(1.02); }
                    100% { transform: translateY(0) translateZ(30px) scale(1); }
                  }
                  .arm-left { transform-origin: 40px 92px; animation: armSwingLeft 1.6s ease-in-out infinite; }
                  .arm-right { transform-origin: 122px 92px; animation: armSwingRight 1.6s ease-in-out infinite; }
                  @keyframes armSwingLeft { 0% { transform: rotate(-12deg); } 50% { transform: rotate(-4deg); } 100% { transform: rotate(-12deg); } }
                  @keyframes armSwingRight { 0% { transform: rotate(12deg); } 50% { transform: rotate(4deg); } 100% { transform: rotate(12deg); } }
                  .sparkles { animation: sparkleDrift 4s linear infinite; }
                  @keyframes sparkleDrift { 0% { transform: translateY(0) translateX(0); opacity: 1 } 100% { transform: translateY(-8px) translateX(6px); opacity: 0.3 } }
                  .drop-shadow-2xl { filter: drop-shadow(0 12px 24px rgba(0,0,0,0.12)); }
                `}</style>
            </div>
        </div>
    );
}
