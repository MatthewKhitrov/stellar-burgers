import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, orderBurger } from '../../services/Slice/orderSlice';
import { clearBurgerConstructor } from '../../services/Slice/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и
   * orderModalData из стора */
  const constructorItems = useSelector(
    (state: RootState) => state.constructorBurger
  );
  const isAuth = useSelector((state) => state.userInfo.isAuthChecked);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let order: string[] = [];

  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(order));
      console.log(BurgerConstructor);
    }
  };

  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.order);

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearBurgerConstructor());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  /* return null;
   */
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
