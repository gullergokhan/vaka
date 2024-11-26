import { useState, useEffect } from 'react';

export const useIsMobile = (mobileSize) => {
    // Initialize the state without referencing window, to support server-side rendering
    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        // Ensure window is defined (this code runs only in the browser)
        const isClient = typeof window === 'object';

        // Handler to call on window resize
        const handleResize = () => {
            if (isClient) {
                setIsMobile(window.innerWidth < mobileSize);
            }
        };

        if (isClient) {
            // Set the initial width
            setIsMobile(window.innerWidth < mobileSize);

            // Add event listener
            window.addEventListener('resize', handleResize);

            // Remove event listener on cleanup
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [mobileSize]); // Re-run the effect when mobileSize changes

    return isMobile;
};
