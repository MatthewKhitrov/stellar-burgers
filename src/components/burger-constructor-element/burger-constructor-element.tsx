import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  changPositionIngredient,
  deleteIngredient
} from '../../services/Slice/constructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(
        changPositionIngredient({
          fromIngredient: index,
          toIngredient: index + 1
        })
      );
    };

    const handleMoveUp = () => {
      dispatch(
        changPositionIngredient({
          fromIngredient: index,
          toIngredient: index - 1
        })
      );
    };

    const handleClose = () => {
      dispatch(deleteIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
