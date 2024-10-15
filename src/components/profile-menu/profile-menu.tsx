import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logOut } from '../../services/Slice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    console.log('AAAA');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
