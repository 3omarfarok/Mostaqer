import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { useAuth } from '../contexts/AuthContext';
import { FaParking, FaClock, FaMoneyBillWave, FaMapMarkerAlt, FaSearch, FaInfoCircle, FaTimes, FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LOCATIONS = {
  Mallaha: { 
    total: 50, 
    available: 23, 
    pricePerHour: 10, // Changed to EGP
    coordinates: { lat: 29.9773, lng: 32.5500 },
    features: ['Security', 'Covered', '24/7']
  },
  Suez: { 
    total: 75, 
    available: 42, 
    pricePerHour: 5, // Changed to EGP
    coordinates: { lat: 29.9668, lng: 32.5498 },
    features: ['Security', '24/7']
  },
  Arbaeen: { 
    total: 30, 
    available: 15, 
    pricePerHour: 2.5, // Changed to EGP
    coordinates: { lat: 29.9584, lng: 32.5486 },
    features: ['Security', 'Covered', 'CCTV']
  },
  PortTawfiq: { 
    total: 60, 
    available: 38, 
    pricePerHour: 5, // Changed to EGP
    coordinates: { lat: 29.9337, lng: 32.5725 },
    features: ['Security', 'Covered', '24/7', 'CCTV']
  }
};

export default function FindParking() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [confirmBooking, setConfirmBooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'price-low', 'price-high', 'availability'
  const [bookingTime, setBookingTime] = useState(1); // Default 1 hour
  const [cost, setCost] = useState(0);
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const { startBooking, activeBooking, finishBooking } = useBooking();
  const { user } = useAuth(); // Using the actual auth context structure
  const navigate = useNavigate();

  // Calculate estimated cost when location or booking time changes
  useEffect(() => {
    if (selectedLocation) {
      setCost(LOCATIONS[selectedLocation].pricePerHour * bookingTime);
    }
  }, [selectedLocation, bookingTime]);

  // Reset selections if there's an active booking
  useEffect(() => {
    if (activeBooking) {
      setSelectedLocation('');
      setSelectedSpot(null);
      setConfirmBooking(false);
    }
  }, [activeBooking]);

  const handleBooking = () => {
    if (!user) {
      toast.error('Please login to book a parking spot');
      navigate('/login');
      return;
    }
    
    if (selectedLocation && selectedSpot) {
      if (confirmBooking) {
        startBooking(selectedLocation, selectedSpot, bookingTime, cost);
        setConfirmBooking(false);
        toast.success(`Parking spot ${selectedSpot} booked successfully at ${selectedLocation}!`);
      } else {
        setConfirmBooking(true);
      }
    }
  };

  const cancelConfirmation = () => {
    setConfirmBooking(false);
  };

  const handleViewMap = () => {
    if (selectedLocation) {
      const { lat, lng } = LOCATIONS[selectedLocation].coordinates;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  // Filter locations based on search and filter type
  const filteredLocations = Object.entries(LOCATIONS)
    .filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filterType === 'price-low') {
        return a[1].pricePerHour - b[1].pricePerHour;
      } else if (filterType === 'price-high') {
        return b[1].pricePerHour - a[1].pricePerHour;
      } else if (filterType === 'availability') {
        return b[1].available - a[1].available;
      }
      return 0;
    });

  // Calculate time remaining for active booking
  const formatBookingTime = (timestamp) => {
    if (!timestamp) return '';
    const startTime = new Date(timestamp);
    const now = new Date();
    const elapsedMs = now - startTime;
    const elapsedHours = Math.floor(elapsedMs / (1000 * 60 * 60));
    const elapsedMinutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${elapsedHours}h ${elapsedMinutes}m`;
  };

  const handleFinishBooking = () => {
    finishBooking();
    toast.success('Booking finished. Thank you for using our service!');
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">Find Parking</h1>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg text-center">
          <div className="text-2xl mb-4 flex items-center justify-center gap-2">
            <FaUserAlt className="text-primary" />
            <span>Login Required</span>
          </div>
          <p className="mb-4">You need to be logged in to book a parking spot.</p>
          <button 
            onClick={navigateToLogin}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary">Find Parking</h1>
      
      {/* User welcome */}
      <div className="mb-6 text-center">
        <p className="text-gray-600 dark:text-light-300">
          Welcome, {user?.name || 'User'}! Ready to find a parking spot?
        </p>
      </div>

      {/* Active booking display */}
      {activeBooking && (
        <div className="mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
            <FaClock />
            Active Booking
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2"><span className="font-semibold">Location:</span> {activeBooking.location}</p>
              <p className="mb-2"><span className="font-semibold">Spot:</span> {activeBooking.spot}</p>
            </div>
            <div>
              <p className="mb-2"><span className="font-semibold">Duration:</span> {formatBookingTime(activeBooking.startTime)}</p>
              <p className="mb-2">
                <span className="font-semibold">Current Cost:</span> EGP {Math.ceil(
                  (new Date() - new Date(activeBooking.startTime)) / (1000 * 60 * 60) * 
                  LOCATIONS[activeBooking.location]?.pricePerHour || 0
                )}
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleFinishBooking}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-all"
            >
              Finish Current Booking
            </button>
          </div>
        </div>
      )}

      {/* Search and filters */}
      {!activeBooking && (
        <div className="mb-8 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border dark:border-dark-300 rounded-lg bg-gray-50 dark:bg-dark-200"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border dark:border-dark-300 rounded-lg bg-gray-50 dark:bg-dark-200 w-full"
              >
                <option value="all">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {!activeBooking && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaParking className="text-primary" />
              Select Location
            </h2>
            {filteredLocations.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No locations match your search</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLocations.map(([name, data]) => (
                  <button
                    key={name}
                    onClick={() => {
                      setSelectedLocation(name);
                      setSelectedSpot(null);
                      setShowLocationInfo(false);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedLocation === name
                        ? 'border-primary shadow-neon'
                        : 'border-gray-200 dark:border-dark-300'
                    } dark:text-light dark:hover:bg-dark-200 relative`}
                  >
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-gray-600 dark:text-light-300 mb-1">
                      {data.available}/{data.total} spots
                    </div>
                    <div className="text-sm text-primary flex items-center gap-1">
                      <FaMoneyBillWave />
                      EGP {data.pricePerHour}/hour
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(name);
                        setShowLocationInfo(true);
                      }}
                      className="absolute top-2 right-2 text-primary hover:text-primary-dark"
                      aria-label="More information"
                    >
                      <FaInfoCircle />
                    </button>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedLocation && !showLocationInfo && (
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaClock className="text-primary" />
                Select Spot
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {Array.from({ length: LOCATIONS[selectedLocation].total }, (_, i) => i + 1).map((spot) => {
                  const isAvailable = spot <= LOCATIONS[selectedLocation].available;
                  return (
                    <button
                      key={spot}
                      onClick={() => isAvailable && setSelectedSpot(spot)}
                      disabled={!isAvailable}
                      className={`
                        p-2 rounded-lg text-center transition-all
                        ${selectedSpot === spot ? 'bg-primary text-white shadow-neon' : ''}
                        ${
                          isAvailable 
                            ? 'bg-gray-100 dark:bg-dark-200 hover:bg-gray-200 dark:hover:bg-dark-300' 
                            : 'bg-red-100 dark:bg-red-900/50 cursor-not-allowed'
                        }
                      `}
                    >
                      {spot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {showLocationInfo && selectedLocation && (
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaInfoCircle className="text-primary" />
                  {selectedLocation} Details
                </h2>
                <button 
                  onClick={() => setShowLocationInfo(false)} 
                  className="text-gray-500 hover:text-red-500"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="mb-4">
                <p className="mb-2"><span className="font-semibold">Price:</span> EGP {LOCATIONS[selectedLocation].pricePerHour}/hour</p>
                <p className="mb-2"><span className="font-semibold">Availability:</span> {LOCATIONS[selectedLocation].available}/{LOCATIONS[selectedLocation].total} spots</p>
                <p className="mb-2"><span className="font-semibold">Features:</span> {LOCATIONS[selectedLocation].features.join(', ')}</p>
              </div>
              <button
                onClick={handleViewMap}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-all mt-2"
              >
                <FaMapMarkerAlt />
                View on Google Maps
              </button>
            </div>
          )}
        </div>
      )}

      {selectedLocation && selectedSpot && !activeBooking && !confirmBooking && (
        <div className="mt-8 bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Booking Details
          </h2>
          <div className="mb-6">
            <label htmlFor="bookingTime" className="block mb-2 font-medium">
              Booking Duration (hours):
            </label>
            <input
              id="bookingTime"
              type="range"
              min="1"
              max="24"
              value={bookingTime}
              onChange={(e) => setBookingTime(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1h</span>
              <span>{bookingTime} hour{bookingTime > 1 ? 's' : ''}</span>
              <span>24h</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-200">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-semibold">{selectedLocation}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-200">
              <p className="text-sm text-gray-500 mb-1">Spot Number</p>
              <p className="font-semibold">{selectedSpot}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-200">
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-semibold">{bookingTime} hour{bookingTime > 1 ? 's' : ''}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-dark-200">
              <p className="text-sm text-gray-500 mb-1">Estimated Cost</p>
              <p className="font-semibold text-primary">EGP {cost}</p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleBooking}
              className="bg-primary text-white px-8 py-3 rounded-lg shadow-neon hover:bg-primary/90 transition-all"
            >
              Proceed to Book
            </button>
          </div>
        </div>
      )}

      {confirmBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-dark-100 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4 text-center">Confirm Booking</h2>
            <div className="mb-6">
              <p className="mb-2">Are you sure you want to book:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Spot <span className="font-semibold">{selectedSpot}</span> at <span className="font-semibold">{selectedLocation}</span></li>
                <li>For <span className="font-semibold">{bookingTime}</span> hour{bookingTime > 1 ? 's' : ''}</li>
                <li>Estimated cost: <span className="font-semibold text-primary">EGP {cost}</span></li>
              </ul>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={cancelConfirmation}
                className="flex-1 bg-gray-300 dark:bg-dark-300 text-gray-800 dark:text-light px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-dark-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}