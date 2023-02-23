import * as type from '../types';
export const unexpectedError = (error) => {
  return (dispatch) => {
    dispatch(type.unexpectedError(error));
  };
};
