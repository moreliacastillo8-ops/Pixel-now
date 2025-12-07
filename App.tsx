import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CreatePinModal } from './components/CreatePinModal';
import { PinDetailModal } from './components/PinDetailModal';
import { Button } from './components/Button';
import { ArrowUpRightIcon, DownloadIcon } from './components/Icon';
import { Pin } from './types';

// Mock initial data
const INITIAL_PINS: Pin[] = Array.from({ length: 30 }).map((_, i) => ({
  id: `static-${i}`,
  title: `Inspiration ${i + 1}`,
  // We use different aspect ratios to simulate a masonry layout feel
  aspectRatio: i % 3 === 0 ? "3/4" : i % 2 === 0 ? "1/1" : "16/9",
  imageUrl: `https://picsum.photos/seed/${i + 150}/600/${i % 3 === 0 ? 800 : i % 2 === 0 ? 600 : 400}`,
  author: `Creator_${i}`,
  description: "A beautiful image curated just for you. Explore more like this on Pixel Now.",
  tags: ["nature", "art", "photography"]
}));

function App() {
  const [pins, setPins] = useState<Pin[]>(INITIAL_PINS);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle newly created pins (from AI)
  const handlePinCreated = (newPin: Pin) => {
    // Add to the START of the list
    setPins(prev => [newPin, ...prev]);
    // Optionally auto-open details
    // setSelectedPin(newPin); 
  };

  const filteredPins = pins.filter(pin => 
    pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (pin.tags && pin.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <Header 
        onSearch={setSearchQuery} 
        onCreateClick={() => setIsCreateModalOpen(true)} 
      />

      {/* Main Grid Content */}
      <main className="px-2 sm:px-4 md:px-8">
        
        {/* Simple CSS Column Masonry using Tailwind */}
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
          {filteredPins.map((pin) => (
            <div 
              key={pin.id} 
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-zoom-in mb-4"
              onClick={() => setSelectedPin(pin)}
            >
              <img 
                src={pin.imageUrl} 
                alt={pin.title} 
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay (Visible on Hover) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                 <div className="flex justify-end">
                    <Button 
                        variant="primary" 
                        size="sm" 
                        className="opacity-100"
                        onClick={(e) => {
                            e.stopPropagation();
                            alert("Saved to your profile!");
                        }}
                    >
                        Save
                    </Button>
                 </div>
                 
                 <div className="flex justify-between items-center">
                    <a 
                        href={pin.imageUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="bg-white/80 hover:bg-white p-2 rounded-full text-black backdrop-blur-sm transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ArrowUpRightIcon className="w-4 h-4" />
                    </a>
                    <div className="flex gap-2">
                        {/* More actions if needed */}
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPins.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <p className="text-xl font-semibold">No pins found.</p>
            <p>Try searching for something else or create a new one!</p>
            <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>Create Pin</Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreatePinModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onPinCreated={handlePinCreated}
      />
      
      <PinDetailModal 
        pin={selectedPin} 
        onClose={() => setSelectedPin(null)} 
      />
      
      {/* Floating Create Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
           <Button variant="icon" className="w-14 h-14 bg-white shadow-xl text-black border border-gray-100 flex items-center justify-center rounded-full" onClick={() => setIsCreateModalOpen(true)}>
               <span className="text-3xl font-light leading-none mb-1">+</span>
           </Button>
      </div>

    </div>
  );
}

export default App;
