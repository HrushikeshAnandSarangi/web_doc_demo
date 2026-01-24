"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Clock, 
  MapPin, 
  Filter, 
  Calendar,
  Video,
  ChevronRight,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Baby,
  Stethoscope,
  LogOut,
  User,
  MessageSquare,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mock Data: Departments
const departments = [
  { id: 'all', name: 'General', icon: Stethoscope },
  { id: 'cardio', name: 'Cardiology', icon: HeartPulse },
  { id: 'neuro', name: 'Neurology', icon: Brain },
  { id: 'ortho', name: 'Orthopedics', icon: Bone },
  { id: 'pediatric', name: 'Pediatrics', icon: Baby },
  { id: 'eye', name: 'Ophthalmology', icon: Eye },
];

// Mock Data: Doctors
const doctors = [
  { 
    id: 1, 
    name: "Dr. Sarah Wilson", 
    specialty: "Cardiologist", 
    rating: 4.9, 
    reviews: 124, 
    availability: "Available Now", 
    hospital: "Central Hospital",
    image: "bg-blue-100 text-blue-600",
    color: "blue"
  },
  { 
    id: 2, 
    name: "Dr. James Chen", 
    specialty: "Neurologist", 
    rating: 4.8, 
    reviews: 89, 
    availability: "Next: 2:00 PM", 
    hospital: "Neuro Institute",
    image: "bg-emerald-100 text-emerald-600",
    color: "emerald"
  },
  { 
    id: 3, 
    name: "Dr. Emily Parker", 
    specialty: "Pediatrician", 
    rating: 5.0, 
    reviews: 210, 
    availability: "Available Now", 
    hospital: "City Children's",
    image: "bg-orange-100 text-orange-600",
    color: "orange"
  },
  { 
    id: 4, 
    name: "Dr. Michael Ross", 
    specialty: "Orthopedic Surgeon", 
    rating: 4.7, 
    reviews: 76, 
    availability: "Tomorrow", 
    hospital: "OrthoCare Clinic",
    image: "bg-purple-100 text-purple-600",
    color: "purple"
  },
    { 
    id: 5, 
    name: "Dr. Linda Ray", 
    specialty: "Dermatologist", 
    rating: 4.9, 
    reviews: 150, 
    availability: "Available Now", 
    hospital: "Skin Health Center",
    image: "bg-rose-100 text-rose-600",
    color: "rose"
  },
    { 
    id: 6, 
    name: "Dr. Robert Fox", 
    specialty: "General Surgeon", 
    rating: 4.6, 
    reviews: 54, 
    availability: "Next: 4:30 PM", 
    hospital: "Central Hospital",
    image: "bg-indigo-100 text-indigo-600",
    color: "indigo"
  },
];

export default function PatientPortal() {
  const router = useRouter();
  const [activeDept, setActiveDept] = useState('all');

  const handleBook = (doctorId: number) => {
    // You could route to a specific booking page here
    alert(`Booking appointment with Doctor ID: ${doctorId}`);
  };

  const handleCall = () => {
    router.push('/select-role');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* SIDEBAR (Simplified for context) */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-20">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-emerald-600">
            <Activity className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">MediCare</span>
          </div>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
              <Search className="w-4 h-4" /> Find Doctors
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
              <Calendar className="w-4 h-4" /> My Appointments
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">
               <MessageSquare className="w-4 h-4" /> Messages
            </button>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
               <User className="w-4 h-4 text-gray-500" />
             </div>
             <div className="text-xs">
               <p className="font-bold text-gray-900">James Anderson</p>
               <button onClick={() => router.push('/')} className="text-gray-500 hover:text-red-500">Sign Out</button>
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Header with Search */}
        <header className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Find a Specialist</h1>
            <p className="text-sm text-gray-500">Discover top doctors and book your consultation</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search doctors, symptoms, hospitals..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
             </div>
             <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
               <Filter className="w-4 h-4" />
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          
          {/* Department Categories */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Browse by Department</h2>
              <button className="text-sm text-emerald-600 font-medium hover:underline">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveDept(dept.id)}
                  className={`flex flex-col items-center gap-3 min-w-[100px] p-4 rounded-2xl border transition-all duration-200 ${
                    activeDept === dept.id 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' 
                      : 'bg-white border-gray-100 text-gray-600 hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <dept.icon className={`w-6 h-6 ${activeDept === dept.id ? 'text-white' : 'text-emerald-600'}`} />
                  <span className="text-xs font-semibold">{dept.name}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Doctors Grid */}
          <section>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Top Rated Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {doctors.map((doctor, index) => (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Doctor Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${doctor.image}`}>
                      {doctor.name.charAt(4)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-emerald-600 transition-colors">
                        {doctor.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-900">{doctor.rating}</span>
                        <span className="text-xs text-gray-400">({doctor.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Tags */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-[10px] font-medium text-gray-600 truncate max-w-[80px]">
                        {doctor.hospital}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                      doctor.availability === "Available Now" 
                        ? 'bg-green-50 border-green-100 text-green-700' 
                        : 'bg-orange-50 border-orange-100 text-orange-700'
                    }`}>
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold">{doctor.availability}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleBook(doctor.id)}
                      className="py-2.5 px-4 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Details
                    </button>
                    {doctor.availability === "Available Now" ? (
                      <button 
                        onClick={handleCall}
                        className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" /> Consult
                      </button>
                    ) : (
                      <button className="py-2.5 px-4 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                        Book Visit
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}