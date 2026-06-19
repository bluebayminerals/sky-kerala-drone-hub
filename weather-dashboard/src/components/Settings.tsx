import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { UnitPreferences } from '../types';
import { unitPreferencesStorage } from '../utils/storageHelpers';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<UnitPreferences>({
    temperature: 'C',
    speed: 'ms',
    pressure: 'mb',
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setPreferences(unitPreferencesStorage.get());
  }, [isOpen]);

  const handleSave = () => {
    unitPreferencesStorage.save(preferences);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-storm-gray">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sky-light rounded-lg text-sky-blue transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Temperature Unit */}
          <div>
            <label className="block text-sm font-bold text-storm-gray mb-3">Temperature Unit</label>
            <div className="space-y-2">
              {['C', 'F', 'K'].map((unit) => (
                <label key={unit} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="temperature"
                    value={unit}
                    checked={preferences.temperature === unit}
                    onChange={(e) =>
                      setPreferences({ ...preferences, temperature: e.target.value as 'C' | 'F' | 'K' })
                    }
                    className="w-4 h-4 text-sky-blue"
                  />
                  <span className="text-storm-gray">
                    {unit === 'C' ? 'Celsius (°C)' : unit === 'F' ? 'Fahrenheit (°F)' : 'Kelvin (K)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Wind Speed Unit */}
          <div>
            <label className="block text-sm font-bold text-storm-gray mb-3">Wind Speed Unit</label>
            <div className="space-y-2">
              {['ms', 'kmh', 'mph'].map((unit) => (
                <label key={unit} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="speed"
                    value={unit}
                    checked={preferences.speed === unit}
                    onChange={(e) =>
                      setPreferences({ ...preferences, speed: e.target.value as 'ms' | 'kmh' | 'mph' })
                    }
                    className="w-4 h-4 text-sky-blue"
                  />
                  <span className="text-storm-gray">
                    {unit === 'ms' ? 'Meters/Second (m/s)' : unit === 'kmh' ? 'Kilometers/Hour (km/h)' : 'Miles/Hour (mph)'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Pressure Unit */}
          <div>
            <label className="block text-sm font-bold text-storm-gray mb-3">Pressure Unit</label>
            <div className="space-y-2">
              {['mb', 'hpa'].map((unit) => (
                <label key={unit} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pressure"
                    value={unit}
                    checked={preferences.pressure === unit}
                    onChange={(e) =>
                      setPreferences({ ...preferences, pressure: e.target.value as 'mb' | 'hpa' })
                    }
                    className="w-4 h-4 text-sky-blue"
                  />
                  <span className="text-storm-gray">
                    {unit === 'mb' ? 'Millibars (mb)' : 'Hectopascals (hPa)'}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-300 text-storm-gray rounded-lg hover:bg-slate-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-sky-blue text-white rounded-lg hover:bg-sky-600 font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <Save size={18} />
            Save
          </button>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-100 text-green-700 px-6 py-3 text-center text-sm font-medium rounded-b-2xl">
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};
