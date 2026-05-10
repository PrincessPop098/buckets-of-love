"use client";

import { useState, useRef, useCallback } from "react";

const SAMPLE_COMPLIMENTS = [
  { id: 1, text: "You make every room brighter just by being in it ✨", anonymous: true, time: "2h ago" },
  { id: 2, text: "Your laugh is genuinely contagious — never change!", anonymous: false, sender: "Jamie", time: "5h ago" },
  { id: 3, text: "You have the kindest heart of anyone I know 💕", anonymous: true, time: "Yesterday" },
];

function Heart({ x, y, size, delay, color }) {
  return (
    <div 
      className="absolute pointer-events-none select-none" 
      style={{ 
        left: x, top: y, fontSize: size, 
        animation: `heartFloat 1.4s ease-out forwards`, 
        animationDelay: `${delay}ms`, 
        opacity: 0, color, zIndex: 9999, 
        filter: "drop-shadow(0 2px 4px rgba(255,105,135,0.3))", 
      }} 
    >♥</div>
  );
}

function BucketIcon({ isOpen, onClick, count }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center transition-transform active:scale-95" style={{ background: "none", border: "none", cursor: "pointer" }}>
      <div className="relative" style={{ filter: "drop-shadow(0 8px 24px rgba(220,80,100,0.35))" }}>
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 22 Q60 5 82 22" stroke="#e85578" strokeWidth="5" strokeLinecap="round" fill="none" style={{ opacity: isOpen ? 0.5 : 1, transition: "opacity 0.3s" }} />
          {!isOpen && <ellipse cx="60" cy="38" rx="36" ry="10" fill="#f472b6" stroke="#e85578" strokeWidth="2" />}
          <path d="M24 38 L32 118 Q32 124 60 124 Q88 124 88 118 L96 38 Z" fill="url(#bucketGrad)" stroke="#e85578" strokeWidth="2" />
          <path d="M36 50 L38 110" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
          <text x="50" y="90" fontSize="20" opacity="0.2" fill="white">♥</text>
          <defs>
            <linearGradient id="bucketGrad" x1="24" y1="38" x2="96" y2="124" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
        </svg>
        {count > 0 && (
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: "linear-gradient(135deg, #f472b6, #e11d48)", fontSize: 11, fontWeight: 700 }}>
            {count > 99 ? "99+" : count}
          </div>
        )}
      </div>
      <span className="mt-2 text-sm font-medium" style={{ color: "#e85578", fontFamily: "'Playfair Display', serif" }}>
        {isOpen ? "Close Bucket" : "Open Bucket"}
      </span>
    </button>
  );
}

function ComplimentCard({ compliment, index }) {
  return (
    <div className="rounded-2xl p-4 mb-3 shadow-sm border" style={{ background: "rgba(255,255,255,0.85)", borderColor: "#fce7f3", animation: `slideUp 0.4s ease-out both`, animationDelay: `${index * 60}ms`, }}>
      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Lora', serif", fontSize: 15 }}> "{compliment.text}" </p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs font-medium" style={{ color: "#f472b6" }}> {compliment.anonymous ? "💌 Anonymous" : `💗 ${compliment.sender}`} </span>
        <span className="text-xs text-gray-400">{compliment.time}</span>
      </div>
    </div>
  );
}

export default function BucketsOfLove() {
  const [name, setName] = useState("Mayra");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("Mayra");
  const [compliments, setCompliments] = useState(SAMPLE_COMPLIMENTS);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [sender, setSender] = useState("");
  const [bucketOpen, setBucketOpen] = useState(true);
  const [hearts, setHearts] = useState([]);
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);
  
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const idRef = useRef(100);

  const spawnHearts = useCallback(() => {
    if (!buttonRef.current || !containerRef.current) return;
    const btnRect = buttonRef.current.getBoundingClientRect();
    const conRect = containerRef.current.getBoundingClientRect();
    const cx = btnRect.left - conRect.left + btnRect.width / 2;
    const cy = btnRect.top - conRect.top + btnRect.height / 2;
    const colors = ["#f472b6", "#fb7185", "#e879a0", "#fda4af", "#f9a8d4", "#ff6b8b"];
    
    const newHearts = Array.from({ length: 18 }, (_, i) => ({
      id: idRef.current++,
      x: cx + (Math.random() - 0.5) * 80,
      y: cy + (Math.random() - 0.5) * 30,
      size: 14 + Math.random() * 22,
      delay: i * 55,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    
    setHearts(h => [...h, ...newHearts]);
    setTimeout(() => setHearts(h => h.filter(heart => !newHearts.find(n => n.id === heart.id))), 2200);
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    setSending(true);
    spawnHearts();
    setTimeout(() => {
      setCompliments(c => [{
        id: idRef.current++,
        text: text.trim(),
        anonymous,
        sender: anonymous ? "" : (sender.trim() || "Someone special"),
        time: "Just now",
      }, ...c]);
      setText("");
      setSender("");
      setSending(false);
      setJustSent(true);
      setBucketOpen(true);
      setTimeout(() => setJustSent(false), 2500);
    }, 600);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes heartFloat {
          0% { transform: translateY(0) scale(0.5) rotate(-10deg); opacity: 0; }
          20% { opacity: 1; transform: translateY(-20px) scale(1.1) rotate(5deg); }
          80% { opacity: 0.8; transform: translateY(-90px) scale(0.9) rotate(-5deg); }
          100% { transform: translateY(-130px) scale(0.6) rotate(10deg); opacity: 0; }
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(225,29,72,0.35); }
          50% { box-shadow: 0 4px 40px rgba(244,114,182,0.7), 0 0 0 8px rgba(244,114,182,0.15); }
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bucketReveal { from { opacity: 0; transform: scaleY(0.96) translateY(-8px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }
        .send-btn:not(:disabled):hover { filter: brightness(1.07); }
        .send-btn:not(:disabled):active { transform: scale(0.97); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #fca5a5; border-radius: 4px; }
      `}</style>
      
      <div ref={containerRef} className="relative min-h-screen overflow-x-hidden flex flex-col items-center" style={{ background: "linear-gradient(160deg, #fff0f6 0%, #fce7f3 40%, #fff5f8 70%, #fdf2f8 100%)", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }} />
          <div className="absolute top-48 -right-20 w-72 h-72 rounded-full opacity-15" style={{ background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)" }} />
          <div className="absolute bottom-16 left-1/3 w-56 h-56 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #fda4af 0%, transparent 70%)" }} />
          {["8%","88%","45%","22%","68%"].map((l,i) => (
            <div key={i} className="absolute text-pink-200 select-none pointer-events-none" style={{ left:l, top:`${12+i*16}%`, fontSize:10+i*4, opacity:0.25+i*0.05 }}>♥</div>
          ))}
        </div>

        {hearts.map(h => <Heart key={h.id} x={h.x} y={h.y} size={h.size} delay={h.delay} color={h.color} />)}

        <div className="relative w-full max-w-md mx-auto px-4 pt-10 pb-16 flex flex-col" style={{ zIndex: 1 }}>
          <div className="text-center mb-8" style={{ animation: "fadeIn 0.6s ease both" }}>
            <div className="text-5xl mb-3">💝</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,6vw,30px)", color: "#be185d", fontWeight: 700, lineHeight: 1.25 }}>
              Fill{" "}
              {editingName ? (
                <input autoFocus value={tempName} onChange={e => setTempName(e.target.value)} onBlur={() => { setName(tempName || "Alex"); setEditingName(false); }} onKeyDown={e => { if (e.key === "Enter") { setName(tempName || "Alex"); setEditingName(false); } }} className="border-b-2 border-pink-400 bg-transparent text-center outline-none" style={{ fontFamily: "'Playfair Display', serif", fontSize: "inherit", color: "#e11d48", width: Math.max((tempName.length||1)+1,4)+"ch" }} />
              ) : (
                <span onClick={() => { setTempName(name); setEditingName(true); }} className="cursor-pointer transition-colors hover:text-pink-500" style={{ color: "#e11d48", textDecoration: "underline", textDecorationStyle: "dotted", textDecorationColor: "#f9a8d4" }} title="Tap to change name">{name}</span>
              )} {'\''}s Bucket with Love!
            </h1>
            <p className="mt-2.5 text-sm" style={{ color: "#f472b6", fontStyle: "italic", fontFamily: "'Lora', serif" }}> Leave a little love — it goes a long way 🌸 </p>
          </div>

          <div className="rounded-3xl p-6 mb-6 shadow-xl" style={{ background: "rgba(255,255,255,0.83)", backdropFilter: "blur(18px)", border: "1.5px solid #fce7f3", animation: "fadeIn 0.7s 0.1s ease both", boxShadow: "0 8px 40px rgba(244,114,182,0.12), 0 2px 8px rgba(0,0,0,0.04)", }}>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-widest" style={{ color: "#f472b6" }}> Your compliment </label>
            <textarea value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSend(); }} placeholder={`Write something kind for ${name}…`} rows={3} className="w-full resize-none rounded-2xl p-3 outline-none text-gray-700 transition-all" style={{ background: "#fff8fb", border: "1.5px solid #fce7f3", fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.65 }} onFocus={e => { e.target.style.borderColor = "#f472b6"; e.target.style.boxShadow = "0 0 0 3px rgba(244,114,182,0.12)"; }} onBlur={e => { e.target.style.borderColor = "#fce7f3"; e.target.style.boxShadow = "none"; }} />
            
            <div className="flex items-center gap-3 mt-3 mb-4 flex-wrap">
              <button onClick={() => setAnonymous(a => !a)} className="relative flex-shrink-0 w-11 h-6 rounded-full transition-all duration-300" style={{ background: anonymous ? "#f472b6" : "#e5e7eb" }}>
                <span className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300" style={{ transform: anonymous ? "translateX(0)" : "translateX(20px)" }} />
              </button>
              <span className="text-sm" style={{ color: "#9ca3af" }}> {anonymous ? "💌 Sending anonymously" : "Sending as:"} </span>
              {!anonymous && (
                <input value={sender} onChange={e => setSender(e.target.value)} placeholder="Your name" className="flex-1 min-w-0 text-sm rounded-xl px-3 py-1.5 outline-none border transition-all" style={{ borderColor: "#fce7f3", background: "#fff8fb" }} onFocus={e => e.target.style.borderColor = "#f472b6"} onBlur={e => e.target.style.borderColor = "#fce7f3"} />
              )}
            </div>

            <button 
              ref={buttonRef} 
              onClick={handleSend} 
              disabled={!text.trim() || sending} 
              className="send-btn w-full py-3.5 rounded-2xl font-semibold text-white text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
              style={{ 
                background: text.trim() && !sending ? "linear-gradient(135deg, #f472b6 0%, #e11d48 100%)" : "linear-gradient(135deg, #fca5a5 0%, #f9a8d4 100%)", 
                boxShadow: text.trim() && !sending ? "0 4px 20px rgba(225,29,72,0.3)" : "none", 
                animation: justSent ? "pulseGlow 0.7s ease" : "none", 
                letterSpacing: "0.02em", 
              }}
            >
              {sending ? "Sending love… 💕" : justSent ? "Love received! 💝" : "Send Love ♥"}
            </button>
          </div>

          <div className="flex flex-col items-center" style={{ animation: "fadeIn 0.7s 0.2s ease both" }}>
            <BucketIcon isOpen={bucketOpen} onClick={() => setBucketOpen(o => !o)} count={compliments.length} />
            {bucketOpen && (
              <div className="w-full mt-4 rounded-3xl overflow-hidden shadow-xl" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(18px)", border: "1.5px solid #fce7f3", animation: "bucketReveal 0.35s cubic-bezier(0.34,1.56,0.64,1) both", boxShadow: "0 8px 40px rgba(244,114,182,0.12)", }}>
                <div className="px-5 pt-5 pb-2 flex items-center justify-between">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#be185d", fontSize: 18 }}> 💝 All the love for {name} </h2>
                  <span className="text-xs rounded-full px-2.5 py-1 font-medium" style={{ background: "#fce7f3", color: "#e85578" }}> {compliments.length} notes </span>
                </div>
                <div className="px-5 pb-5 overflow-y-auto" style={{ maxHeight: 380 }}>
                  {compliments.length === 0 ? (
                    <p className="text-center py-10 text-gray-400" style={{ fontFamily: "'Lora', serif", fontStyle: "italic" }}> The bucket is waiting for its first drop of love 🌸 </p>
                  ) : (
                    compliments.map((c, i) => <ComplimentCard key={c.id} compliment={c} index={i} />)
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
