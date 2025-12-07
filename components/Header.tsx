import React, { useState } from 'react';
import { SearchIcon, BellIcon, MessageCircleIcon, PlusIcon } from './Icon';
import { Button } from './Button';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCreateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onCreateClick }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white z-50 flex items-center px-4 md:px-6 shadow-sm justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center gap-1 min-w-fit cursor-pointer">
        <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl">
          P
        </div>
        <span className="hidden md:block text-primary font-bold text-lg tracking-tight">Pixel Now</span>
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex items-center gap-1">
        <Button variant="ghost" active>Home</Button>
        <Button variant="ghost" onClick={onCreateClick}>Create</Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for inspiration"
          className="w-full bg-[#efefef] hover:bg-[#e2e2e2] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all h-12 rounded-full pl-12 pr-4 text-gray-900 placeholder-gray-500 font-normal"
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-1 md:gap-2 shrink-0">
        <div className="md:hidden">
             <Button variant="icon" size="icon" onClick={onCreateClick}>
                 <PlusIcon className="w-6 h-6" />
             </Button>
        </div>
        <Button variant="icon" size="icon" className="hidden sm:flex">
          <BellIcon className="w-6 h-6" />
        </Button>
        <Button variant="icon" size="icon" className="hidden sm:flex">
          <MessageCircleIcon className="w-6 h-6" />
        </Button>
        
        {/* Profile Avatar */}
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-200 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ml-1">
          <img src="https://picsum.photos/seed/user/200" alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
};