import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Estado inicial
    setIsMobile(mediaQuery.matches);

    // Suscripción
    mediaQuery.addEventListener('change', handleChange);

    // Limpieza
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [breakpoint]);

  return isMobile;
}
