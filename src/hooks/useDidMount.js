import { useEffect, useState } from 'react';

const useDidMount = (initState = false) => {
  const [didMount, setDidMount] = useState(initState);

  useEffect(() => {
    setDidMount(true);

    return () => {
      setDidMount(false);
    };
  }, []);

  return didMount;
};

export default useDidMount;
