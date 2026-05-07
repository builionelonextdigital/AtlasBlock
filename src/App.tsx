import { useState } from 'react';
import { AtlasBlock } from './components/AtlasMap/AtlasBlock';
import { DEFAULT_CONFIG } from './constants';
import { AtlasConfig } from './types';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';

export default function App() {
  const [config] = useState<AtlasConfig>(DEFAULT_CONFIG);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Mock Shopify Storefront Header */}
      <header className="sticky top-0 bg-white z-[2000] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2">
              <Menu size={20} />
            </button>
            <div className="text-xl font-black tracking-tighter text-slate-900">
              ATLAS<span className="text-blue-600">STORE</span>
            </div>
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-slate-900">Shop All</a>
              <a href="#" className="hover:text-slate-900">New Arrivals</a>
              <a href="#" className="text-blue-600 font-bold">Store Locations</a>
              <a href="#" className="hover:text-slate-900">Our Story</a>
            </nav>
          </div>
          
          <div className="flex items-center gap-4 text-slate-600">
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {/* Banner Section */}
        <section className="bg-slate-900 py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Find a Store Near You
            </h1>
            <p className="text-slate-400 text-lg">
              Visit our physical locations to experience our full collection in person. 
              Our experts are ready to help you find your perfect fit.
            </p>
          </div>
        </section>

        {/* The Theme Extension Block */}
        <section className="py-12 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Interactive Map</h2>
              <p className="text-slate-500">Browse through our curated locations across the globe.</p>
            </div>
            
            {/* This is how the block would render in Liquid */}
            <div id="shopify-section-atlas-map" className="shopify-section">
              <AtlasBlock config={config} />
            </div>
          </div>
        </section>

        {/* FAQ Section (Mock Content) */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Do I need an appointment?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  While walk-ins are always welcome, we recommend booking a session for personalized styling service.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Are all items in-stock?</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Inventory varies by location. Check the "In-store" availability on product pages before visiting.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Storefront Footer */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">&copy; 2026 AtlasStore. Powered by Shopify.</p>
        </div>
      </footer>
    </div>
  );
}
