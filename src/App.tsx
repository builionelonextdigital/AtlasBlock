import { useState } from 'react';
import { AtlasBlock } from './components/AtlasMap/AtlasBlock';
import { DEFAULT_CONFIG } from './constants';
import { AtlasConfig } from './types';
import { Settings, Eye, Code, Smartphone, Monitor, ChevronRight } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [config, setConfig] = useState<AtlasConfig>(DEFAULT_CONFIG);

  return (
    <div className="flex h-screen bg-[#F1F1F1] font-sans text-[#303030]">
      {/* Mock Shopify Sidebar */}
      <aside className="w-[300px] bg-white border-r border-[#E3E3E3] flex flex-col shrink-0 overflow-hidden">
        <div className="p-4 border-b border-[#E3E3E3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#008060] rounded flex items-center justify-center text-white">
              <Settings size={18} />
            </div>
            <span className="font-bold text-sm">Theme Editor</span>
          </div>
          <div className="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">Draft</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Current Section</h3>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white">
                  <Code size={12} />
                </div>
                <span className="text-sm font-medium">Atlas Store Locator</span>
              </div>
              <ChevronRight size={14} className="text-slate-400" />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Block Settings</h3>
            
            <div className="space-y-3">
              <label className="block">
                <span className="text-[13px] font-medium block mb-1.5">Map Height</span>
                <input 
                  type="text" 
                  value={config.settings.mapHeight}
                  onChange={(e) => setConfig({
                    ...config,
                    settings: { ...config.settings, mapHeight: e.target.value }
                  })}
                  className="w-full bg-white border border-[#D1D1D1] rounded px-3 py-1.5 text-sm focus:border-[#008060] focus:ring-1 focus:ring-[#008060] outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[13px] font-medium block mb-1.5">Marker Color</span>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={config.settings.markerColor}
                    onChange={(e) => setConfig({
                      ...config,
                      settings: { ...config.settings, markerColor: e.target.value }
                    })}
                    className="w-10 h-8 p-1 bg-white border border-[#D1D1D1] rounded cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={config.settings.markerColor}
                    onChange={(e) => setConfig({
                      ...config,
                      settings: { ...config.settings, markerColor: e.target.value }
                    })}
                    className="flex-1 bg-white border border-[#D1D1D1] rounded px-3 py-1.5 text-sm outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-[13px] font-medium block mb-1.5">Map Theme</span>
                <select 
                  value={config.settings.theme}
                  onChange={(e) => setConfig({
                    ...config,
                    settings: { ...config.settings, theme: e.target.value as 'light' | 'dark' }
                  })}
                  className="w-full bg-white border border-[#D1D1D1] rounded px-3 py-1.5 text-sm outline-none"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </label>

              <label className="flex items-center gap-3 cursor-pointer py-2">
                <input 
                  type="checkbox" 
                  checked={config.settings.showSidebar}
                  onChange={(e) => setConfig({
                    ...config,
                    settings: { ...config.settings, showSidebar: e.target.checked }
                  })}
                  className="w-4 h-4 rounded border-[#D1D1D1] text-[#008060] focus:ring-[#008060]"
                />
                <span className="text-[13px] font-medium">Show Side List</span>
              </label>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Locations ({config.locations.length})</h3>
            <div className="space-y-2">
              {config.locations.map(loc => (
                <div key={loc.id} className="p-2 border border-slate-200 rounded flex items-center justify-between group cursor-pointer hover:bg-slate-50">
                  <span className="text-xs truncate max-w-[180px]">{loc.name}</span>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                    <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><Settings size={12} /></button>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded text-xs font-bold text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-all uppercase tracking-tighter">
                + Add Location Block
              </button>
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-[#E3E3E3] bg-white">
          <button className="w-full bg-[#008060] text-white font-bold py-2.5 rounded shadow-sm hover:bg-[#006e52] transition-colors text-sm">
            Save Changes
          </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-12 bg-white border-b border-[#E3E3E3] shrink-0 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <div className="flex bg-[#F1F1F1] p-0.5 rounded cursor-pointer">
              <button 
                onClick={() => setDevice('desktop')}
                className={cn("p-1.5 rounded", device === 'desktop' ? "bg-white shadow-sm text-slate-900" : "text-slate-400")}
              >
                <Monitor size={16} />
              </button>
              <button 
                onClick={() => setDevice('mobile')}
                className={cn("p-1.5 rounded", device === 'mobile' ? "bg-white shadow-sm text-slate-900" : "text-slate-400")}
              >
                <Smartphone size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('preview')}
              className={cn("text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-3 pt-3 border-b-2 transition-all", activeTab === 'preview' ? "border-[#008060] text-[#008060]" : "border-transparent text-slate-400 hover:text-slate-600")}
            >
              <Eye size={14} /> Preview
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={cn("text-xs font-bold uppercase tracking-wider flex items-center gap-2 pb-3 pt-3 border-b-2 transition-all", activeTab === 'code' ? "border-[#008060] text-[#008060]" : "border-transparent text-slate-400 hover:text-slate-600")}
            >
              <Code size={14} /> Code
            </button>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Shopify Online Store 2.0 Template
          </div>
        </header>

        {/* The Actual Preview Canvas */}
        <div className="flex-1 overflow-auto p-8 flex justify-center bg-[#F1F1F1]">
          <div 
            className={cn(
              "bg-white shadow-2xl transition-all duration-500 overflow-hidden",
              device === 'mobile' ? "w-[375px] h-[667px]" : "w-full max-w-[1200px]"
            )}
          >
            {activeTab === 'preview' ? (
              <div className="h-full flex flex-col bg-white">
                {/* Simulated Storefront Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-[10px] font-black italic">A</div>
                    <span className="font-black text-sm tracking-tighter">ATLAS.STORE</span>
                  </div>
                  <nav className="hidden md:flex gap-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    <a href="#">Products</a>
                    <a href="#" className="text-slate-900 border-b border-slate-900">Locations</a>
                    <a href="#">About</a>
                  </nav>
                  <div className="w-10 h-6 bg-slate-100 rounded-full" />
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-6 md:p-12 text-center bg-slate-50">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Our Neighborhoods</h2>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">Explore our physical spaces and find the nearest community hub.</p>
                  </div>

                  {/* LIQUID SIMULATION WRAPPER */}
                  <div className="p-4">
                    <div 
                      id="atlas-block-root" 
                      className="shopify-app-block h-full"
                      data-settings={JSON.stringify(config.settings)}
                      data-locations={JSON.stringify(config.locations)}
                    >
                      <AtlasBlock config={config} />
                    </div>
                  </div>

                  <div className="p-8 border-t border-slate-100 bg-white">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="w-8 h-8 rounded bg-slate-200 mb-2" />
                        <div className="h-3 w-2/3 bg-slate-200 rounded" />
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="w-8 h-8 rounded bg-slate-200 mb-2" />
                        <div className="h-3 w-1/2 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 font-mono text-xs text-slate-800 bg-[#1e1e1e] h-full overflow-auto">
                <div className="text-emerald-400 mb-4">{`{% comment %} AtlasBlock Theme App Extension {% endcomment %}`}</div>
                <div className="text-slate-300">
                  {`<div id="atlas-block-root"`} <br />
                  &nbsp;&nbsp;{`data-settings='{{ block.settings | json }}'`} <br />
                  &nbsp;&nbsp;{`data-locations='['`} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{`{% for loc in section.blocks %}`} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`{ "id": "{{ loc.id }}", "name": "{{ loc.settings.name }}" ... }`} <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;{`{% endfor %}`} <br />
                  &nbsp;&nbsp;{`]'`} <br />
                  {`></div>`}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
