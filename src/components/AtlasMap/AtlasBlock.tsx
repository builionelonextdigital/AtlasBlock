import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Map as MapIcon, List as ListIcon } from 'lucide-react';
import { LeafletMap } from './LeafletMap';
import { LocationList } from './LocationList';
import { AtlasConfig, Location, MapSettings } from '../../types';
import { cn } from '../../lib/utils';

interface AtlasBlockProps {
  config: AtlasConfig;
}

export function AtlasBlock({ config }: AtlasBlockProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(config.locations[0]?.id || null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Sync with config changes (e.g. from Shopify Editor)
  const { settings, locations } = config;

  return (
    <div 
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

        {/* Mobile Toggle Controls */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] md:hidden">
          <div className="flex bg-white shadow-xl rounded-full p-1 border border-slate-200">
            <button 
              onClick={() => setViewMode('map')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                viewMode === 'map' ? "bg-slate-900 text-white shadow-md" : "text-slate-600"
              )}
            >
              <MapIcon size={16} />
              Map
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                viewMode === 'list' ? "bg-slate-900 text-white shadow-md" : "text-slate-600"
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-[1001] bg-white md:hidden"
            >
              <LocationList 
                locations={locations}
                settings={settings}
                selectedLocationId={selectedLocationId}
                onSelectLocation={(id) => {
                  setSelectedLocationId(id);
                  setViewMode('map');
                }}
              />
              
              <button 
                onClick={() => setViewMode('map')}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-semibold"
              >
                Back to Map
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Location Card (Quick View) */}
        <AnimatePresence>
          {selectedLocationId && viewMode === 'map' && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute bottom-4 left-4 right-4 z-[1000] md:hidden"
            >
              {(() => {
                const loc = locations.find(l => l.id === selectedLocationId);
                if (!loc) return null;
                return (
                  <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-100 flex items-center gap-4">
                    {loc.imageUrl && (
                      <img src={loc.imageUrl} className="w-20 h-20 rounded-xl object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">{loc.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{loc.address}</p>
                      <button 
                        className="mt-2 text-xs font-bold uppercase tracking-wider"
                        style={{ color: settings.markerColor }}
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
