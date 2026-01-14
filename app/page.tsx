"use client"; // Required for Framer Motion and Hooks in App Router

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, User, Lock, Mail, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const LoginPage = () => {
  const [role, setRole] = useState<'doctor' | 'patient'>('patient');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  // Theme configuration
  const theme = {
    doctor: {
      primary: 'bg-blue-600 hover:bg-blue-700',
      text: 'text-blue-600',
      border: 'focus:ring-blue-500',
      gradient: 'from-blue-600 to-blue-800',
      icon: <Stethoscope className="w-6 h-6" />,
    },
    patient: {
      primary: 'bg-emerald-600 hover:bg-emerald-700',
      text: 'text-emerald-600',
      border: 'focus:ring-emerald-500',
      gradient: 'from-emerald-500 to-teal-700',
      icon: <User className="w-6 h-6" />,
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      // NEXT.JS REDIRECTION LOGIC
      if (role === 'doctor') {
        router.push('/doctor_portal');
      } else {
        router.push('/patient_portal');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className={`absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-700 ${role === 'doctor' ? 'bg-blue-400' : 'bg-emerald-400'}`} />
      <div className={`absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl transition-colors duration-700 ${role === 'doctor' ? 'bg-indigo-400' : 'bg-teal-400'}`} />

      <motion.div 
        layout
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden relative z-10"
      >
        {/* Header */}
        <div className={`p-8 pb-6 text-center transition-colors duration-500 bg-gradient-to-r ${theme[role].gradient}`}>
          <motion.div 
            key={role}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm text-white"
          >
            {theme[role].icon}
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-1">Welcome Back</h2>
          <p className="text-white/80 text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Role Toggles */}
        <div className="flex p-2 bg-gray-100 mx-6 -mt-6 rounded-xl relative shadow-sm">
          {['patient', 'doctor'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as 'doctor' | 'patient')}
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg z-10 transition-colors duration-200 ${
                role === r ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {r === 'doctor' ? 'Doctor' : 'Patient'}
            </button>
          ))}
          <motion.div
            className="absolute top-2 bottom-2 bg-white rounded-lg shadow-sm"
            layoutId="toggle-bg"
            initial={false}
            animate={{
              left: role === 'patient' ? '0.5rem' : '50%',
              width: 'calc(50% - 0.75rem)',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Form */}
        <div className="p-8 pt-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {role === 'doctor' ? 'Medical ID / Email' : 'Patient Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="email" 
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 transition-all duration-200 ${theme[role].border}`}
                    placeholder={role === 'doctor' ? 'dr.smith@hospital.com' : 'name@example.com'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="password" 
                    required
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 outline-none focus:ring-2 transition-all duration-200 ${theme[role].border}`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-white rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-[0.98] ${theme[role].primary} ${loading ? 'opacity-80 cursor-wait' : ''}`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;