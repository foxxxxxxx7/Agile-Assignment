import { useEffect, useState } from "react";
import { getTV } from '../api/tmdb-api'

const useTV = id => {
  const [tv, setTV] = useState(null);
  useEffect(() => {
    getTV(id).then(tv => {
      setTV(tv);
    });
  }, [id]);
  return [tv, setTV];
};

export default useTV;