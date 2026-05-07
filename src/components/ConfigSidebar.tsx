import { Settings2, MapPin, Eye, Palette } from 'lucide-react';
import { AtlasConfig } from '../types';

interface ConfigSidebarProps {
  config: AtlasConfig;
  onChange: (config: AtlasConfig) => void;
}

export function ConfigSidebar({ config, onChange }: ConfigSidebarProps) {
  const updateSettings = (key: keyof AtlasConfig['settings'], value: any) => {
    onChange({
      ...config,
      settings: {
        ...config.settings,
        [key]: value
      }
    });
  };

  return (
    <div className="hidden lg:flex flex-col w-72 bg-slate-50 border-l border-slate-200 h-full p-6 overflow-y-auto">
      <div className="flex items-center gap-2 mb-8">
        <Settings2 size={20} className="text-blue-600" />
        <h2 className="font-bold text-slate-800">Theme Editor</h2>
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Palette size={14} />
            Visual Identity
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Marker Color</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={config.settings.markerColor}
                  onChange={(e) => updateSettings('markerColor', e.target.value)}
                  className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer"
                />
                <input 
                  type="text" 
                  value={config.settings.markerColor}
                  onChange={(e) => updateSettings('markerColor', e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Map Theme</label>
              <select 
                value={config.settings.theme}
                onChange={(e) => updateSettings('theme', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Border Radius</label>
              <select 
                value={config.settings.borderRadius}
                onChange={(e) => updateSettings('borderRadius', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-md"
              >
                <option value="0px">None</option>
                <option value="8px">Small (8px)</option>
                <option value="16px">Medium (16px)</option>
                <option value="32px">Large (32px)</option>
                <option value="100px">Pill</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Eye size={14} />
            Layout & View
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Show Sidebar</span>
              <input 
                type="checkbox" 
                checked={config.settings.showSidebar}
                onChange={(e) => updateSettings('showSidebar', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 transition-all border-slate-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Animated Pins</span>
              <input 
                type="checkbox" 
                checked={config.settings.markerPulse}
                onChange={(e) => updateSettings('markerPulse', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Zoom Level ({config.settings.zoomLevel})</label>
              <input 
                type="range" 
                min="1" 
                max="18" 
                value={config.settings.zoomLevel}
                onChange={(e) => updateSettings('zoomLevel', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <MapPin size={14} />
            Location Data
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed italic">
            In Shopify, these are added as "Blocks" within the Section. Merchants can drag and drop to reorder.
          </p>
          
          <div className="mt-4 space-y-2">
            {config.locations.map((loc) => (
              <div key={loc.id} className="p-3 bg-white border border-slate-200 rounded-lg text-xs flex justify-between items-center group">
                <span className="font-medium truncate pr-2">{loc.name}</span>
                <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">Edit</span>
              </div>
            ))}
            <button className="w-full mt-2 py-2 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-bold rounded-lg hover:border-slate-300 hover:text-slate-500 transition-all">
              + Add Location
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
