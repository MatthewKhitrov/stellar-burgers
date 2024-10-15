import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  useNavigate,
  useMatch,
  useLocation
} from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../services/Slice/IngredientsSlice';
import ProtectedRoute from '../protectedRoute/protectedRoute';
import { checkUser } from '../../services/Slice/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const location = useLocation();

  const orderNumber = profileMatch || feedMatch;
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute authUser>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute authUser>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute authUser>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute authUser>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

//Khitrovmatvei@yandex.ru
