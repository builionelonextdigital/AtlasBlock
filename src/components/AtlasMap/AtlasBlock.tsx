import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map as MapIcon, List as ListIcon, Navigation } from 'lucide-react';
import { LeafletMap } from './LeafletMap';
import { LocationList } from './LocationList';
import { AtlasConfig, Location } from '../../types';
import { cn } from '../../lib/utils';
import { DEFAULT_CONFIG } from '../../constants';

interface AtlasBlockProps {
  config?: AtlasConfig;
}

export function AtlasBlock({ config: propConfig }: AtlasBlockProps) {
  // Logic to load from DOM attributes (Shopify Pattern)
  const [domConfig, setDomConfig] = useState<AtlasConfig | null>(null);
  
  useEffect(() => {
    const root = document.getElementById('atlas-block-root');
    if (root) {
      try {
        const settings = JSON.parse(root.getAttribute('data-settings') || '{}');
        const locations = JSON.parse(root.getAttribute('data-locations') || '[]');
        if (locations.length > 0) {
          setDomConfig({
            settings: { ...DEFAULT_CONFIG.settings, ...settings },
            locations
          });
        }
      } catch (e) {
        console.error('AtlasBlock: Failed to parse DOM data', e);
      }
    }
  }, []);

  const config = propConfig || domConfig || DEFAULT_CONFIG;
  const { settings, locations } = config;

  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(locations[0]?.id || null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Handle selected location object
  const activeLocation = useMemo(() => 
    locations.find(l => l.id === selectedLocationId) || locations[0]
  , [locations, selectedLocationId]);

  return (
    <div 
      id="atlas-block-root-content"
      className="flex flex-col md:flex-row bg-white overflow-hidden shadow-2xl border border-slate-200"
      style={{ 
        height: settings.mapHeight,
        borderRadius: settings.borderRadius 
      }}
    >
      {/* Desktop Sidebar */}
      {settings.showSidebar && (
        <div className="hidden md:block">
          <LocationList 
            locations={locations}
            settings={settings}
            selectedLocationId={selectedLocationId}
            onSelectLocation={setSelectedLocationId}
          />
        </div>
      )}

      {/* Main Map Area */}
      <div className="flex-1 relative">
        <LeafletMap 
          locations={locations}
          settings={settings}
          selectedLocationId={selectedLocationId}
          onSelectLocation={(id) => {
            setSelectedLocationId(id);
            if (window.innerWidth < 768) {
              setViewMode('map');
            }
          }}
        />

        {/* Floating Search/Filter Bar (Theme Extension Only addition) */}
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[1000] space-y-2">
          <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-1 border border-slate-200 flex items-center">
            <div className="flex-1 px-3 py-1.5 text-sm text-slate-400 font-medium">
              Search locations...
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <Navigation size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Toggle Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] md:hidden">
          <div className="flex bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-1.5 border border-slate-200/50">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                viewMode === 'map' ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <MapIcon size={16} />
              Map
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all",
                viewMode === 'list' ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <ListIcon size={16} />
              List
            </button>
          </div>
        </div>

        {/* Mobile Full Screen List View */}
        <AnimatePresence>
          {viewMode === 'list' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 z-[1001] bg-white md:hidden"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">All Locations</h3>
                  <button onClick={() => setViewMode('map')} className="text-sm font-bold text-blue-600">Close</button>
                </div>
                <div className="flex-1 overflow-hidden">
                  <LocationList 
                    locations={locations}
                    settings={settings}
                    selectedLocationId={selectedLocationId}
                    onSelectLocation={(id) => {
                      setSelectedLocationId(id);
                      setViewMode('map');
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Location Card (Quick View - Mobile) */}
        <AnimatePresence>
          {selectedLocationId && viewMode === 'map' && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="absolute bottom-24 left-4 right-4 z-[1000] md:hidden"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-slate-200 flex items-center gap-4">
                {activeLocation?.imageUrl && (
                  <img src={activeLocation.imageUrl} className="w-20 h-20 rounded-xl object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{activeLocation?.name}</h4>
                  <p className="text-xs text-slate-500 truncate mb-2">{activeLocation?.address}</p>
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
                    >
                      Directions
                    </button>
                    <button 
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600"
                    >
                      Call
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
