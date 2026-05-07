export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  description?: string;
  imageUrl?: string;
  linkText?: string;
  linkUrl?: string;
}

export interface MapSettings {
  mapHeight: string;
  markerColor: string;
  theme: 'light' | 'dark' | 'auto';
  borderRadius: string;
  zoomLevel: number;
  showSidebar: boolean;
  popupStyle: 'minimal' | 'detailed';
  markerPulse: boolean;
  clusteringEnabled: boolean;
}

export interface AtlasConfig {
  settings: MapSettings;
  locations: Location[];
}
