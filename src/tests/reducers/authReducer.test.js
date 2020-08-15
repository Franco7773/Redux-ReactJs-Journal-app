import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en el AuthReducer', () => {

  test('Debe de realizar el login', () => {

    const initState = {};

    const action = {
      type: types.login,
      payload: {
        uid: 'abcd',
        displayName: 'Gianfranco'
      }
    };
    
    const state = authReducer( initState, action );

    expect( state ).toEqual({ uid: 'abcd', name: 'Gianfranco' });
  });

  test('Debe de realizar el logout', () => {

    const initState = {};

    const action = {
      type: types.logout
    };
    
    const state = authReducer( initState, action );

    expect( state ).toEqual({ });
  });
});