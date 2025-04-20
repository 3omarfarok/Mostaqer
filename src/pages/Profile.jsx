import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaHistory, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  // Mock booking history (in a real app, this would come from a database)
  const bookingHistory = [
    {
      id: 1,
      location: 'Mallaha',
      spot: 'A12',
      startTime: '2024-03-15T10:00:00',
      endTime: '2024-03-15T12:00:00',
      duration: '2 hours',
      price: '$10'
    },
    {
      id: 2,
      location: 'Suez',
      spot: 'B05',
      startTime: '2024-03-14T14:00:00',
      endTime: '2024-03-14T17:00:00',
      duration: '3 hours',
      price: '$15'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* User Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-primary">{user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-center">
            <div className="font-bold text-2xl text-primary">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-center">
            <div className="font-bold text-2xl text-primary">12h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Time</div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg text-center">
            <div className="font-bold text-2xl text-primary">$45</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Spent</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Booking History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 dark:text-secondary">
          <FaHistory className="text-primary dark:text-secondary" />
          Recent Bookings
        </h2>
        
        <div className="space-y-4">
          {bookingHistory.map(booking => (
            <div
              key={booking.id}
              className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <span className="font-semibold">{booking.location}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Spot {booking.spot}
                  </span>
                </div>
                <span className="font-bold text-primary">{booking.price}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <FaClock />
                <span>{new Date(booking.startTime).toLocaleString()}</span>
                <span>→</span>
                <span>{new Date(booking.endTime).toLocaleString()}</span>
                <span className="ml-2">({booking.duration})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}