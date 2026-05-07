import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { cn } from '../../lib/utils';
import { Location, MapSettings } from '../../types';

interface LeafletMapProps {
  locations: Location[];
  settings: MapSettings;
  selectedLocationId: string | null;
  onSelectLocation: (id: string) => void;
}

function MapController({ selectedLocation, zoomLevel }: { selectedLocation: Location | null, zoomLevel: number }) {
  const map = useMap();
  
  if (selectedLocation) {
    map.flyTo([selectedLocation.lat, selectedLocation.lng], zoomLevel, {
      duration: 1.5,
    });
  }
  
  return null;
}

export function LeafletMap({ locations, settings, selectedLocationId, onSelectLocation }: LeafletMapProps) {
  const selectedLocation = locations.find(l => l.id === selectedLocationId) || null;

  // Custom marker icon using Lucide
  const createCustomIcon = (color: string, isSelected: boolean) => {
    const iconHtml = renderToStaticMarkup(
      <div className={cn(
        "relative flex items-center justify-center transition-all duration-300",
        isSelected ? "scale-125" : "hover:scale-110",
        settings.markerPulse && "animate-pulse"
      )}>
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-sm"
          style={{ backgroundColor: color }}
        />
        <MapPin 
          size={isSelected ? 36 : 28} 
          fill={color} 
          color="white" 
          strokeWidth={1.5}
        />
      </div>
    );

    return L.divIcon({
      html: iconHtml,
      className: 'custom-div-icon',
      iconSize: isSelected ? [40, 40] : [30, 30],
      iconAnchor: isSelected ? [20, 20] : [15, 15],
    });
  };

  const tileLayer = settings.theme === 'dark' 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  return (
    <div 
      className="relative overflow-hidden w-full h-full"
      style={{ borderRadius: settings.borderRadius }}
    >
      <MapContainer
        center={[locations[0]?.lat || 0, locations[0]?.lng || 0]}
        zoom={settings.zoomLevel}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url={tileLayer}
          attribution={attribution}
        />
        
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng]}
            icon={createCustomIcon(settings.markerColor, loc.id === selectedLocationId)}
            eventHandlers={{
              click: () => onSelectLocation(loc.id),
            }}
          >
            <Popup className="atlas-popup">
              <div className="flex flex-col bg-white overflow-hidden">
                {loc.imageUrl && settings.popupStyle === 'detailed' && (
                  <img 
                    src={loc.imageUrl} 
                    alt={loc.name}
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-slate-900">{loc.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{loc.address}</p>
                  {loc.description && settings.popupStyle === 'detailed' && (
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{loc.description}</p>
                  )}
                  {loc.linkUrl && (
                    <a 
                      href={loc.linkUrl}
                      className="inline-block mt-4 text-sm font-medium transition-colors hover:opacity-80"
                      style={{ color: settings.markerColor }}
                    >
                      {loc.linkText || 'Learn More'} →
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController selectedLocation={selectedLocation} zoomLevel={settings.zoomLevel} />
      </MapContainer>

      {/* Floating Controls Overlay */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <button 
          onClick={() => {}}
          className="bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
        >
          {/* Zoom controls are built-in or custom */}
        </button>
      </div>
    </div>
  );
}
