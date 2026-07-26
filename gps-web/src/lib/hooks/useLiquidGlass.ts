import { useEffect, useRef } from 'react';

export function useLiquidGlass(options = {}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    
    const liquidGlassFn = (window as any).liquidGlass;
    if (!liquidGlassFn) {
      // In case the script is loading async, wait a bit or try again
      const interval = setInterval(() => {
        const fn = (window as any).liquidGlass;
        if (fn && ref.current) {
          clearInterval(interval);
          const glass = fn(ref.current, options);
          (ref as any)._glassInstance = glass;
        }
      }, 100);
      
      return () => {
        clearInterval(interval);
        if ((ref as any)._glassInstance) {
          (ref as any)._glassInstance.destroy();
        }
      };
    }

    const glass = liquidGlassFn(ref.current, options);
    (ref as any)._glassInstance = glass;

    return () => {
      if ((ref as any)._glassInstance) {
        (ref as any)._glassInstance.destroy();
      }
    };
  }, [options]);

  return ref;
}
