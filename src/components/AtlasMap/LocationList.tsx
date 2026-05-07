import { motion } from 'motion/react';
import { ExternalLink, Navigation, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Location, MapSettings } from '../../types';

interface LocationListProps {
  locations: Location[];
  settings: MapSettings;
  selectedLocationId: string | null;
  onSelectLocation: (id: string) => void;
}

export function LocationList({ locations, settings, selectedLocationId, onSelectLocation }: LocationListProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 w-full md:w-80 lg:w-96">
      <div className="p-6 border-bottom border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-semibold text-slate-900">Our Locations</h2>
        <p className="text-sm text-slate-500 mt-1">Find the nearest store to you</p>
        
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search city or zip..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {locations.map((loc) => {
          const isSelected = loc.id === selectedLocationId;
          
          return (
            <motion.div
              key={loc.id}
              whileHover={{ x: 4 }}
              onClick={() => onSelectLocation(loc.id)}
              className={cn(
                "p-4 rounded-xl cursor-pointer transition-all duration-200 border",
                isSelected 
                  ? "bg-slate-900 border-slate-900 shadow-lg" 
                  : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-md"
              )}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-medium transition-colors",
                    isSelected ? "text-white" : "text-slate-900"
                  )}>
                    {loc.name}
                  </h3>
                  <p className={cn(
                    "text-xs mt-1 leading-relaxed",
                    isSelected ? "text-slate-300" : "text-slate-500"
                  )}>
                    {loc.address}
                  </p>
                </div>
                {isSelected && (
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Navigation size={16} className="text-white" />
                  </div>
                )}
              </div>

              {isSelected && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-white/10 flex gap-3"
                >
                  <button className="flex-1 bg-white text-slate-900 py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                    <Navigation size={12} />
                    Directions
                  </button>
                  <button className="flex-1 bg-white/10 text-white py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink size={12} />
                    Store Details
                  </button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
