'use client'
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    return (
        <>
        
        <div className="w-full min-h-screen text-center mt-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Task Management App</h1>
          <p className="text-lg text-gray-600">Manage your tasks efficiently and effectively.</p>
        </div>
        </>
      );
}
