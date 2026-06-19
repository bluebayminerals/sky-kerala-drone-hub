import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface HomepageProps {
  setCurrentTab: (tab: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({ setCurrentTab }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(204, 255, 0, .05) 25%, rgba(204, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(204, 255, 0, .05) 75%, rgba(204, 255, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(204, 255, 0, .05) 25%, rgba(204, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(204, 255, 0, .05) 75%, rgba(204, 255, 0, .05) 76%, transparent 77%, transparent)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-acid-green bg-black text-acid-green">
            <Zap size={16} />
            <span className="text-sm font-medium">KOCHI'S UNDERGROUND CULTURE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-white">KOCHI'S PULSE.</span>
            <br />
            <span className="text-acid-green">DECENTRALIZED.</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Are you looking to book a DJ for a private underground music event? We bridge the gap between world-class sonic curators and premium private spaces. Explore raw warehouse sets in historical spaces or high-energy open-air sundowners changing Kerala's local nightlife culture.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setCurrentTab('roster')}
              className="group px-8 py-4 bg-acid-green text-black font-bold rounded-lg hover:shadow-neon-green-lg transition-all flex items-center justify-center gap-2"
            >
              Book an Artist
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setCurrentTab('radar')}
              className="group px-8 py-4 border-2 border-acid-green text-acid-green font-bold rounded-lg hover:bg-acid-green hover:text-black transition-all flex items-center justify-center gap-2"
            >
              Explore Weekend Gigs
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trend Banner */}
          <div className="bg-industrial-gray-light border border-acid-green rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-acid-green font-bold mb-3">2026-2027 LOCAL TRENDS</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>✦ Warehouse transformations in Fort Kochi - Historic spaces become cultural hubs</p>
              <p>✦ The rise of Melodic Techno, EBM, & Psy-Trance in South India - Underground movements gaining momentum</p>
              <p>✦ Private poolside sundowners with electronic soundscapes - Luxury meets counterculture</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
