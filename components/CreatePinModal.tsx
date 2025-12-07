import React, { useState } from 'react';
import { Button } from './Button';
import { XIcon, SparklesIcon } from './Icon';
import { generateImage } from '../services/geminiService';
import { AspectRatio, Pin } from '../types';

interface CreatePinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPinCreated: (pin: Pin) => void;
}

export const CreatePinModal: React.FC<CreatePinModalProps> = ({ isOpen, onClose, onPinCreated }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.Square);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const base64Image = await generateImage(prompt, aspectRatio);
      
      const newPin: Pin = {
        id: Date.now().toString(),
        title: prompt, // Use prompt as title initially
        imageUrl: base64Image,
        author: "You",
        description: `Generated with Gemini 2.5 Flash Image. Prompt: "${prompt}"`,
        tags: ["AI Generated", "Gemini", "Pixel Now"],
        isGenerated: true,
      };

      onPinCreated(newPin);
      onClose();
      setPrompt('');
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 z-10 transition-colors"
        >
          <XIcon className="w-6 h-6 text-gray-500" />
        </button>

        {/* Left Side: Visual/Preview Area (Abstract for now) */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-100 min-h-[300px]">
           <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-primary/20 to-blue-200 mb-6 flex items-center justify-center">
              <SparklesIcon className="w-12 h-12 text-primary animate-pulse" />
           </div>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">Create with AI</h2>
           <p className="text-gray-500 text-sm max-w-[80%]">
             Describe your imagination and let Gemini Flash generate a unique pin for you in seconds.
           </p>
        </div>

        {/* Right Side: Controls */}
        <div className="w-full md:w-1/2 p-8 flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What do you want to create?</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cute cyberpunk cat eating ramen, pixel art style..."
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white rounded-2xl resize-none h-32 transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setAspectRatio(AspectRatio.Square)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${aspectRatio === AspectRatio.Square ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
              >
                Square (1:1)
              </button>
              <button 
                onClick={() => setAspectRatio(AspectRatio.Portrait)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${aspectRatio === AspectRatio.Portrait ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
              >
                Portrait (3:4)
              </button>
               <button 
                onClick={() => setAspectRatio(AspectRatio.Tall)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${aspectRatio === AspectRatio.Tall ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
              >
                Tall (9:16)
              </button>
              <button 
                onClick={() => setAspectRatio(AspectRatio.Landscape)}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${aspectRatio === AspectRatio.Landscape ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
              >
                Wide (16:9)
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-auto">
            <Button 
              variant="primary" 
              className="w-full py-4 text-lg" 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Dreaming...
                </span>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
