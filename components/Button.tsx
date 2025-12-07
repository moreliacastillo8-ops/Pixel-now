import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'secondary', 
  size = 'md', 
  active = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-red-700 active:bg-red-800",
    secondary: "bg-[#efefef] text-black hover:bg-[#e2e2e2] active:bg-[#dcdcdc]",
    ghost: "bg-transparent text-black hover:bg-[#efefef]",
    icon: "bg-transparent hover:bg-[#efefef] text-gray-700"
  };

  const activeStyles = active ? "bg-black text-white hover:bg-black" : "";

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
    icon: "p-3 w-12 h-12"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${active ? activeStyles : ''} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};