import React from 'react';
import { Music, Menu, X } from 'lucide-react';

interface NavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navigation: React.FC<NavProps> = ({ currentTab, setCurrentTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 'home', label: 'HOME' },
    { id: 'roster', label: 'ROSTER' },
    { id: 'radar', label: 'RADAR' },
    { id: 'onboard', label: 'JOIN' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-industrial-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
              <Music className="w-6 h-6 text-acid-green" />
              <span className="text-xl font-bold text-acid-green hidden sm:inline">SUB-KULTR</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    currentTab === tab.id
                      ? 'text-acid-green border-b-2 border-acid-green'
                      : 'text-white hover:text-acid-green'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-acid-green"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-industrial-gray-light">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentTab === tab.id
                      ? 'text-acid-green bg-industrial-gray'
                      : 'text-white hover:text-acid-green hover:bg-industrial-gray'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
};
