import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { addBun, addIngredient } from '../../services/Slice/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      const ingredientWithId: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };
      if (ingredientWithId.type === 'bun') {
        dispatch(addBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
