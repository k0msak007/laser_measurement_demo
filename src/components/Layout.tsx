import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <main className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {children}
      </div>
    </main>
  </div>
);