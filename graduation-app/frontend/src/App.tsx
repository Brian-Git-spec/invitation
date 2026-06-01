import React, { useState } from 'react';
import { sendInvitation } from './services/api';
import { GraduationCap, MapPin, Calendar, Clock, Send, CheckCircle } from 'lucide-react';

const relationships = ["Aunt", "Uncle", "Cousin", "Friend", "Brother", "Sister", "Lecturer", "Classmate", "Guardian", "Other"];

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [loading, setLoading] = useState(false);
  const [invitation, setInvitation] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relation) return alert("Please fill in all fields");
    
    setLoading(true);
    try {
      // Send an empty string if 'Other' is picked so the backend strips it out
      const displayRelation = relation === "Other" ? "" : relation;
      const data = await sendInvitation(name, displayRelation);
      setInvitation(data.message);
    } catch (error) {
      console.error("Error sending invitation", error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-dark text-white font-sans selection:bg-gold/30">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="flex justify-center mb-6 animate-bounce">
          <GraduationCap size={80} className="text-gold" />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 py-9 bg-gradient-to-r from-gold via-yellow-200 to-gold bg-clip-text text-transparent">
          Class of Moringa 2026
        </h1>
        <p className="text-xl text-gray-400 mb-8 italic">"The journey of a thousand miles begins with a single step."</p>
        
        {/* Event Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-white/5 p-8 rounded-2xl border border-gold/20 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <MapPin className="text-gold mb-2" />
            <h3 className="font-bold">Venue</h3>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=The+A.S.K.+Dome+Jamhuri+Grounds+Nairobi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-gold transition-colors underline decoration-gold/30 underline-offset-4"
            >
              The A.S.K. Dome, Jamhuri Grounds
            </a>
            <h4 className="text-xs font-medium mt-1 text-gray-500 ">Click above to view on Google Maps</h4>
          </div>
          <div className="flex flex-col items-center border-x border-gold/10">
            <Calendar className="text-gold mb-2" />
            <h3 className="font-bold">Date</h3>
            <p className="text-gray-400">29th July 2026</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="text-gold mb-2" />
            <h3 className="font-bold">Time</h3>
            <p className="text-gray-400">8:30 AM - 1:00 PM</p>
          </div>
        </div>

        {/* Invitation Form / Result */}
        {!invitation ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl text-dark shadow-gold/20 shadow-2xl transform transition hover:scale-[1.01]">
            <h2 className="text-2xl font-bold mb-6">RSVP & Get Invitation</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-semibold mb-1">Relationship</label>
                <select 
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-gold outline-none transition"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  required
                >
                  <option value="">Select Relation</option>
                  {relationships.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Your Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-gold outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                 />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-dark text-gold font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95"
              >
                {loading ? "Generating..." : <><Send size={18}/> Generate Invitation</>}
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-gradient-to-br from-gold to-yellow-600 p-1 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="bg-white text-dark p-8 rounded-[1.4rem]">
              <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-serif font-bold mb-4">Official Invitation from Brian.W.Warui</h2>
              <p className="text-lg leading-relaxed mb-6 italic">"{invitation}"</p>
              <div className="border-t pt-4">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Presented to: {name}</p>
              </div>
              <button 
                onClick={() => setInvitation(null)}
                className="mt-6 text-sm underline text-gray-400 hover:text-dark transition"
              >
                Generate another invitation
              </button>
              <button
                 onClick={() => window.print()}
                 className="mt-4 w-full border border-dark/20 text-dark py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition"
                >
                 <span className="text-sm font-bold">🖨️ Print Invitation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;