import React from 'react';
import { Pin } from '../types';
import { Button } from './Button';
import { ArrowUpRightIcon, ShareIcon, XIcon, DownloadIcon } from './Icon';

interface PinDetailModalProps {
  pin: Pin | null;
  onClose: () => void;
}

export const PinDetailModal: React.FC<PinDetailModalProps> = ({ pin, onClose }) => {
  if (!pin) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
      <div 
        className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-200" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
           onClick={onClose}
           className="absolute top-4 left-4 md:left-auto md:-right-12 md:top-0 p-2 text-white hover:text-gray-300 transition-colors z-50"
        >
          <XIcon className="w-8 h-8 drop-shadow-lg" />
        </button>

        {/* Image Side */}
        <div className="w-full md:w-1/2 bg-black flex items-center justify-center relative overflow-hidden group">
          <img 
            src={pin.imageUrl} 
            alt={pin.title} 
            className="w-full h-full object-contain max-h-[60vh] md:max-h-full"
          />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={pin.imageUrl} download="pixel-now-image.png" target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm" className="shadow-lg">
                      <DownloadIcon className="w-5 h-5" />
                  </Button>
              </a>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-2">
              <Button variant="icon" size="icon">
                <ShareIcon className="w-6 h-6" />
              </Button>
              <Button variant="icon" size="icon">
                <span className="font-bold text-xl">...</span>
              </Button>
            </div>
            <Button variant="primary" size="lg">Save</Button>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {pin.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {pin.description || "No description available for this pin."}
          </p>

          <div className="flex items-center gap-4 mb-8">
             <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src={`https://picsum.photos/seed/${pin.author}/100`} alt={pin.author} className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="font-bold text-gray-900">{pin.author}</p>
                <p className="text-sm text-gray-500">12.5k followers</p>
             </div>
             <Button variant="secondary" className="ml-auto">Follow</Button>
          </div>
          
          <div className="mt-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Comments</h3>
              <div className="bg-gray-100 rounded-2xl p-4 text-gray-500 text-sm">
                  No comments yet! Add one to start the conversation.
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};