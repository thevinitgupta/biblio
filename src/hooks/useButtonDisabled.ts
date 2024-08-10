import { useState, useEffect } from 'react';

function useButtonDisabled(pending: boolean, initialDisabled = false) {
  const [isDisabled, setIsDisabled] = useState(initialDisabled || pending);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted) {
        setIsDisabled(pending);
      }
    }, 350); // Adjust timeout for desired transition duration

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [pending]);

  return isDisabled;
}

export default useButtonDisabled;