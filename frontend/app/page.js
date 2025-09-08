'use client'
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  //   const { currentUser, token } = useAuth();
  //     const router = useRouter();

  // useEffect(() => {
   
  //   if (currentUser && token) {
  //     router.push('/dashboard');
  //   }
  // }, [currentUser, token, router]);

  // if (currentUser && token) {
    
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="loading-spinner"></div>
  //     </div>
  //   );
  // }
  return (
        <div  className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
          <h3 className="text-center">Task Management App</h3>
          
        </div>
      );
}
