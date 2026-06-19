import React from 'react';
import { Cloud, Menu, X, Settings } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
  showSettings,
  setShowSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'search', label: 'Search' },
    { id: 'locations', label: 'My Locations' },
    { id: 'forecast', label: 'Forecast' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <Cloud className="w-8 h-8 text-sky-blue" />
            <span className="text-xl font-bold text-storm-gray hidden sm:inline">Weather Dashboard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === tab.id
                    ? 'bg-sky-blue text-white'
                    : 'text-storm-gray hover:bg-sky-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Settings & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-sky-light rounded-lg text-sky-blue transition-colors"
              title="Settings"
            >
              <Settings size={20} />
            </button>
            <button
              className="md:hidden p-2 hover:bg-sky-light rounded-lg text-sky-blue transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentTab === tab.id
                    ? 'bg-sky-blue text-white'
                    : 'text-storm-gray hover:bg-sky-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
