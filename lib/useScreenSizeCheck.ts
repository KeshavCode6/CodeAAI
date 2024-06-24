import {useEffect, useState} from "react"

export const useScreenSizeCheck = () => {
    const [screenTooSmall, setScreenTooSmall] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        // Check if window object exists (for SSR)
        if (typeof window !== 'undefined') {
          // Check if screen width is less than 1680 pixels
          const isScreenTooSmall = window.innerWidth < 1680;
          setScreenTooSmall(isScreenTooSmall);
        }
      };
  
      // Initial check on mount
      handleResize();
  
      // Event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Cleanup function to remove event listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount
  
    return screenTooSmall;
};