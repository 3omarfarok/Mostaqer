import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [activeBooking, setActiveBooking] = useState(() => {
    const saved = localStorage.getItem('activeBooking');
    return saved ? JSON.parse(saved) : null;
  });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (activeBooking) {
      localStorage.setItem('activeBooking', JSON.stringify(activeBooking));
      
      const interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      localStorage.removeItem('activeBooking');
      setTimer(0);
    }
  }, [activeBooking]);

  const startBooking = (location, spot) => {
    setActiveBooking({ location, spot, startTime: new Date().toISOString() });
    toast.success('Booking started successfully!');
  };

  const finishBooking = () => {
    setActiveBooking(null);
    toast.success('Booking finished successfully!');
  };

  return (
    <BookingContext.Provider value={{ 
      activeBooking, 
      timer,
      startBooking, 
      finishBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}