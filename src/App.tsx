import { useState } from 'react';
import { AtlasBlock } from './components/AtlasMap/AtlasBlock';
import { ConfigSidebar } from './components/ConfigSidebar';
import { DEFAULT_CONFIG } from './constants';
import { AtlasConfig } from './types';
import { Map, Layers, Share2, Download } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<AtlasConfig>(DEFAULT_CONFIG);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Premium Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg text-white shadow-lg shadow-slate-200">
            <Map size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">AtlasBlock</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Premium Store Locator</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-semibold text-slate-600">Vite Build v1.2.0</span>
          </div>
          
          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <Share2 size={18} />
          </button>
          
          <div className="h-8 w-px bg-slate-200 mx-1" />
          
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
            <Download size={16} />
            Export to Shopify
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Application Canvas */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded mb-2">Live Preview</span>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Store Locator Preview</h2>
                <p className="text-slate-500 mt-1 max-w-lg">How AtlasBlock will appear to your customers. Interact with the map and pins below.</p>
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
                  <Layers size={14} />
                  Change Tile Provider
                </button>
              </div>
            </div>

            <AtlasBlock config={config} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pb-12">
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Zero Configuration</h4>
                <p className="text-sm text-slate-500 leading-relaxed">No API keys required. AtlasBlock uses OpenStreetMap tiles out of the box so you can go live in seconds.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Metafield Powered</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Store all your location data directly within Shopify. No external database or hosting needed.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Ultra Lightweight</h4>
                <p className="text-sm text-slate-500 leading-relaxed">Optimized React footprint ensures your store remains blazing fast while delivering a premium map experience.</p>
              </div>
            </div>
          </div>
        </main>

        <ConfigSidebar config={config} onChange={setConfig} />
      </div>
    </div>
  );
}
