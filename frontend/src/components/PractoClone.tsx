'use client';

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Phone, Calendar, ChevronDown, User, Shield, Stethoscope, ShoppingCart, FileText, TestTube, BookOpen, Building } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  location: string;
  consultationFee: number;
  rating: number;
  patientStories: number;
  isAvailableToday: boolean;
  clinicName?: string;
  additionalClinics?: number;
  isClinic?: boolean;
}

type PageType = 'home' | 'doctors';

const PractoClone: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctors data from backend API
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors data');
      }
      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors when component mounts or when switching to doctors page
  useEffect(() => {
    if (currentPage === 'doctors') {
      fetchDoctors();
    }
  }, [currentPage]);

  const HomePage: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-400 rounded-full opacity-15"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-400 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-400 rounded-full opacity-5"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-20 right-1/4 w-8 h-8 bg-yellow-300 transform rotate-45 opacity-20"></div>
        <div className="absolute bottom-32 right-32 w-6 h-6 bg-pink-300 transform rotate-45 opacity-25"></div>
        <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-green-300 rounded-full opacity-30"></div>
        
        {/* Medical icons scattered */}
        <div className="absolute top-24 left-1/2 opacity-10">
          <Stethoscope className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-40 right-1/4 opacity-10">
          <TestTube className="w-10 h-10 text-white" />
        </div>
        
        {/* Abstract curved lines */}
        <svg className="absolute bottom-0 left-0 w-full h-64 opacity-20" viewBox="0 0 1200 300">
          <path d="M0,200 Q300,50 600,150 T1200,100 L1200,300 L0,300 Z" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">•practo•</span>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button 
                  onClick={() => setCurrentPage('doctors')}
                  className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-500"
                >
                  Find Doctors
                </button>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Video Consult</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Surgeries</a>
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                For Corporates <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                For Providers <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                Security & help <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-blue-600 hover:text-blue-800">Login / Signup</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Your home for health
          </h1>
          
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Find and Book</h2>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-2 flex">
              <div className="flex items-center px-4 border-r border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Bangalore" 
                  className="outline-none text-gray-700 w-32"
                />
              </div>
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search doctors, clinics, hospitals, etc." 
                  className="outline-none text-gray-700 w-full"
                />
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center text-white text-sm">
                <span className="mr-4">Popular searches:</span>
                <button 
                  onClick={() => setCurrentPage('doctors')}
                  className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full mr-2 text-sm hover:bg-opacity-30"
                >
                  Dermatologist
                </button>
                <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full mr-2 text-sm hover:bg-opacity-30">
                  Pediatrician
                </button>
                <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full mr-2 text-sm hover:bg-opacity-30">
                  Gynecologist/Obstetrician
                </button>
                <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm hover:bg-opacity-30">
                  Orthopedist
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Services */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mt-20">
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer">
              <Stethoscope className="w-8 h-8 mx-auto mb-2" />
            </div>
            <span className="text-sm">Consult with a doctor</span>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer">
              <ShoppingCart className="w-8 h-8 mx-auto mb-2" />
            </div>
            <span className="text-sm">Order Medicines</span>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer">
              <FileText className="w-8 h-8 mx-auto mb-2" />
            </div>
            <span className="text-sm">View medical records</span>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer relative">
              <TestTube className="w-8 h-8 mx-auto mb-2" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
            </div>
            <span className="text-sm">Book test</span>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
            </div>
            <span className="text-sm">Read articles</span>
          </div>
          <div className="text-center text-white">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-2 hover:bg-opacity-30 transition-all cursor-pointer">
              <Building className="w-8 h-8 mx-auto mb-2" />
            </div>
            <span className="text-sm">For healthcare providers</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div className="flex">
          <div className="w-24 h-24 mr-6">
            {doctor.isClinic ? (
              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-yellow-600 font-semibold text-xs">Aesthetic Heart</div>
                  <div className="text-yellow-600 font-bold text-lg">AH</div>
                  <div className="text-yellow-600 text-xs">Dermatology & Cardiology</div>
                </div>
              </div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face" 
                alt={doctor.name}
                className="w-full h-full rounded-full object-cover"
              />
            )}
            <div className="text-center mt-1">
              {doctor.isClinic ? (
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">AD</span>
              ) : (
                <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  <span className="font-bold">•practo•</span>
                  <div className="text-xs">Skin & Hair</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-blue-600 mb-1">{doctor.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{doctor.specialty}</p>
            <p className="text-gray-600 text-sm mb-1">{doctor.experience}</p>
            <p className="text-gray-700 font-medium mb-1">
              {doctor.location}
              {doctor.clinicName && ` • ${doctor.clinicName}`}
              {doctor.additionalClinics && ` + ${doctor.additionalClinics} more`}
            </p>
            <p className="text-gray-900 font-semibold mb-3">
              ₹{doctor.consultationFee} {doctor.isClinic ? 'Consultation Fees' : 'Consultation fee at clinic'}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                <span className="text-green-600 text-sm font-semibold">👍 {doctor.rating}%</span>
              </div>
              <button className="text-gray-600 underline text-sm">
                {doctor.patientStories} Patient Stories
              </button>
            </div>
          </div>
        </div>
        <div className="text-right space-y-2">
          {doctor.isAvailableToday && (
            <div className="text-green-600 text-sm font-medium flex items-center justify-end">
              <Calendar className="w-4 h-4 mr-1" />
              Available Today
            </div>
          )}
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 block w-full">
            Book Clinic Visit
            {!doctor.isClinic && <div className="text-xs">No Booking Fee</div>}
          </button>
          {!doctor.isClinic && (
            <button className="border border-blue-500 text-blue-500 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Contact Clinic
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const DoctorsPage: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span 
                className="text-2xl font-bold text-blue-600 cursor-pointer" 
                onClick={() => setCurrentPage('home')}
              >
                •practo•
              </span>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">Find Doctors</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Video Consult</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Surgeries</a>
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">NEW</span>
              <button className="text-gray-700 hover:text-blue-600 flex items-center">
                For Corporates <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <span className="text-gray-700">For</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex space-x-4">
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 flex-1">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <input type="text" defaultValue="Jp Nagar" className="bg-transparent outline-none flex-1" />
            </div>
            <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2 flex-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input type="text" defaultValue="Dermatologist" className="bg-transparent outline-none flex-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-blue-800 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <button className="text-white flex items-center hover:text-blue-200">
                Gender <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-white flex items-center hover:text-blue-200">
                Patient Stories <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-white flex items-center hover:text-blue-200">
                Experience <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button className="text-white flex items-center hover:text-blue-200">
                All Filters <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white">Sort By</span>
              <button className="text-white flex items-center hover:text-blue-200">
                Relevance <ChevronDown className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {doctors.length} Dermatologists available in Jp nagar, Bangalore
          </h1>
          <div className="flex items-center text-gray-600">
            <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center mr-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <span>Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading doctors...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {error}</p>
            <button 
              onClick={fetchDoctors}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Doctor Cards */}
        {!loading && !error && (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No doctors found. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'doctors' && <DoctorsPage />}
      
      {/* Navigation buttons for demo */}
      <div className="fixed bottom-4 right-4 flex space-x-2 z-50">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 'home' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
          }`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('doctors')} 
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === 'doctors' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
          }`}
        >
          Doctors List
        </button>
      </div>
    </div>
  );
};

export default PractoClone;
