import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { getFeeds } from '../../services/Slice/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getFeeds());
  }, [refresh]);

  const orders: TOrder[] = useSelector((state) => state.feeds.feeds.orders);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        //console.log(11112233);
        setRefresh(!refresh); // Изменить значение refresh для вызова useEffect снова
      }}
    />
  );
};
