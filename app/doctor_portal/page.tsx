"use client";

import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  Calendar, 
  Search, 
  MoreVertical, 
  Video, 
  FileText,
  User,
  LogOut
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Mock Data for Chats
const chats = [
  { id: 1, name: "Sarah Williams", message: "Dr., is the dosage correct?", time: "10:30 AM", unread: 2, avatar: "bg-purple-100 text-purple-600" },
  { id: 2, name: "Michael Chen", message: "Thanks for the update.", time: "Yesterday", unread: 0, avatar: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Emma Wilson", message: "I have a question about...", time: "Yesterday", unread: 0, avatar: "bg-green-100 text-green-600" },
];

// Mock Data for Patient Queue
const queue = [
  { id: 101, name: "James Anderson", condition: "Chronic Migraine", time: "11:00 AM", status: "Waiting", type: "Follow-up" },
  { id: 102, name: "Linda Martinez", condition: "Hypertension Review", time: "11:30 AM", status: "Confirmed", type: "Check-up" },
  { id: 103, name: "Robert Taylor", condition: "Post-op Assessment", time: "12:15 PM", status: "Confirmed", type: "Physical" },
];

export default function DoctorPortal() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'queue' | 'chats'>('queue');

  const handleCallPatient = (patientId: number) => {
    // In a real app, you might pass the ID as a query param: /call?patientId=...
    router.push('/select-role'); 
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* SIDEBAR (Navigation & Chats) */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col z-10">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="font-bold text-lg">Dr</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Dr. Smith</h1>
              <p className="text-xs text-gray-500">Cardiologist</p>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Messages</h3>
            <div className="space-y-1">
              {chats.map((chat) => (
                <button 
                  key={chat.id}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${chat.avatar}`}>
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-gray-900 text-sm truncate">{chat.name}</span>
                      <span className="text-[10px] text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate group-hover:text-gray-700">{chat.message}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors w-full px-2 py-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Patient Queue</h2>
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {queue.length} Pending
            </span>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
               <Calendar className="w-5 h-5" />
             </button>
             <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
               <Clock className="w-5 h-5" />
             </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
          
          {/* Active/Next Patient Card */}
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 mb-4">UP NEXT</h3>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                   <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{queue[0].name}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {queue[0].time}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{queue[0].condition}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                   <FileText className="w-4 h-4" />
                   View Records
                 </button>
                 <motion.button 
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleCallPatient(queue[0].id)}
                   className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                 >
                   <Video className="w-4 h-4" />
                   Start Call
                 </motion.button>
              </div>
            </div>
          </section>

          {/* Upcoming Queue List */}
          <section>
            <h3 className="text-sm font-semibold text-gray-500 mb-4">UPCOMING ({queue.length - 1})</h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {queue.slice(1).map((patient, index) => (
                <div 
                  key={patient.id} 
                  className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    index !== queue.length - 2 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <span className="font-semibold text-sm">{patient.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                      <p className="text-xs text-gray-500">{patient.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                     <div className="text-right">
                       <p className="text-sm font-medium text-gray-900">{patient.time}</p>
                       <p className="text-xs text-gray-500">Estimated</p>
                     </div>
                     <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                       {patient.status}
                     </span>
                     <button className="text-gray-400 hover:text-gray-600">
                       <MoreVertical className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}