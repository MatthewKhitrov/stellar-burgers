import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  authUser?: boolean;
  children: React.ReactElement;
};

export default function ProtectedRoute({
  children,
  authUser = false
}: ProtectedRouteProps) {
  const isLoggedIn = useSelector((store) => store.userInfo.isAuthChecked);

  const location = useLocation();
  const from = location.state?.from || '/';
  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (authUser && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!authUser && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
