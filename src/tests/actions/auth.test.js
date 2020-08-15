import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'

import { login, logout, startLogout, startLoginWithEmailAndPassword } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
  auth: {
    uid: 'TESTING'
  },
  notes: {
    active: {
      id: '04jwhd6sj47hd',
      title: 'Título',
      body: 'Cuerpo'
    }
  }
};

let store = mockStore( initState );

describe('Pruebas con las acciones de Auth', () => {

  beforeEach(() => {
    store = mockStore( initState );
  });
  
  test('Login y logout deben de crear la accion respectiva', () => {
    
    const uid = 'ABCD123';
    const displayName = 'Gianfranco';


    const loginAction = login( uid, displayName )
    const logoutAction = logout();

    expect( loginAction ).toEqual({
      type: types.login,
      payload: { uid, displayName }
    });

    expect( logoutAction ).toEqual({
      type: types.logout
    });
  });

  test('Debe de realizar el startLogout', async () => {
    
    await store.dispatch( startLogout());

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.logout
    });

    expect( actions[1] ).toEqual({
      type: types.notesLogoutCleaning
    });
  });

  xtest('Debe de íniciar el startLoginEmailPassword', async () => {
    
    await store.dispatch( startLoginWithEmailAndPassword('test@testing.com', '1234567'));

    const actions = store.getActions();

    expect( actions[1] ).toEqual({
      type: types.login,
      payload: {
        uid: '04jwhd6sj47hd',
        displayName: null
      }
    })
  });
});
