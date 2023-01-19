import { useLocation } from 'react-router-dom';
import { Path } from 'types/enums';

const usePage = (): Path => {
  const location = useLocation();
  const routes = location.pathname.split('/');
  return routes[1] as Path;
};

export default usePage;
