'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, User, Video, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SelectRolePage() {
  const router = useRouter();
  const [hoveredRole, setHoveredRole] = useState<'doctor' | 'patient' | null>(null);

  const joinAsDoctor = () => {
    router.push('/call?role=doctor');
  };

  const joinAsPatient = () => {
    router.push('/call?role=patient');
  };

  const roles = [
    {
      id: 'doctor' as const,
      title: 'Join as Doctor',
      description: 'Access medical consultation tools',
      icon: <Stethoscope className="w-12 h-12" />,
      gradient: 'from-blue-600 to-blue-800',
      hoverGradient: 'from-blue-700 to-blue-900',
      bgBlob: 'bg-blue-400',
      onClick: joinAsDoctor,
    },
    {
      id: 'patient' as const,
      title: 'Join as Patient',
      description: 'Connect with your healthcare provider',
      icon: <User className="w-12 h-12" />,
      gradient: 'from-emerald-500 to-teal-700',
      hoverGradient: 'from-emerald-600 to-teal-800',
      bgBlob: 'bg-emerald-400',
      onClick: joinAsPatient,
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <motion.div 
        className={`absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-700 ${hoveredRole === 'doctor' ? 'bg-blue-500' : hoveredRole === 'patient' ? 'bg-emerald-500' : 'bg-purple-400'}`}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className={`absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-700 ${hoveredRole === 'doctor' ? 'bg-indigo-500' : hoveredRole === 'patient' ? 'bg-teal-500' : 'bg-pink-400'}`}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="w-full max-w-5xl relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent inline-flex items-center gap-3 mb-4">
            <Video className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl font-bold">Join the Meeting</h1>
          </div>
          <p className="text-gray-600 text-lg">Select your role to continue</p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onHoverStart={() => setHoveredRole(role.id)}
              onHoverEnd={() => setHoveredRole(null)}
              onClick={role.onClick}
              className="cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full transition-shadow duration-300 hover:shadow-2xl">
                
                {/* Card Header */}
                <div className={`p-8 text-center bg-gradient-to-r ${hoveredRole === role.id ? role.hoverGradient : role.gradient} transition-all duration-300`}>
                  <motion.div
                    animate={{
                      scale: hoveredRole === role.id ? 1.1 : 1,
                      rotate: hoveredRole === role.id ? [0, -10, 10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm text-white"
                  >
                    {role.icon}
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h2>
                  <p className="text-gray-600 mb-6">{role.description}</p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 px-6 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r ${role.gradient} hover:${role.hoverGradient}`}
                  >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Your connection will be secure and encrypted
        </motion.p>
      </div>
    </div>
  );
}