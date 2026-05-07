import { AtlasConfig } from './types';

export const DEFAULT_CONFIG: AtlasConfig = {
  settings: {
    mapHeight: '600px',
    markerColor: '#3b82f6',
    theme: 'light',
    borderRadius: '16px',
    zoomLevel: 13,
    showSidebar: true,
    popupStyle: 'detailed',
    markerPulse: true,
    clusteringEnabled: true,
  },
  locations: [
    {
      id: '1',
      name: 'Flagship Store',
      lat: 40.7128,
      lng: -74.006,
      address: '123 Broadway, New York, NY 10012',
      description: 'Our main location in the heart of NYC. Come visit us for exclusive items!',
      imageUrl: 'https://images.unsplash.com/photo-1581417478175-a9ef18f210c1?auto=format&fit=crop&q=80&w=400',
      linkText: 'Book an Appointment',
      linkUrl: '#',
    },
    {
      id: '2',
      name: 'Brooklyn Outpost',
      lat: 40.6782,
      lng: -73.9442,
      address: '456 Atlantic Ave, Brooklyn, NY 11217',
      description: 'A cozy spot featuring our latest seasonal collections.',
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400',
      linkText: 'View Store Hours',
      linkUrl: '#',
    },
    {
      id: '3',
      name: 'Design District Studio',
      lat: 25.8130,
      lng: -80.1918,
      address: '789 NE 40th St, Miami, FL 33137',
      description: 'Our creative hub where art and commerce meet.',
      imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e73ca921d?auto=format&fit=crop&q=80&w=400',
      linkText: 'Get Directions',
      linkUrl: '#',
    }
  ]
};
