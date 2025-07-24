import Header from '@/components/Header.tsx';
import { motion } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from '@tanstack/react-router';

function RootLayout() {
  return (
    <>
      <Header />
      <Toaster />

      <motion.div layout transition={{ duration: 0.3 }}>
        <Outlet />
      </motion.div>
    </>
  );
}

export default RootLayout;
