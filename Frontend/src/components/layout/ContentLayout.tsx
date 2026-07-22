import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: Props) {
  return (
    <main className="mx-auto h-[calc(100vh-81px)] max-w-7xl overflow-auto px-6 py-6">
      {children}
    </main>
  );
}
