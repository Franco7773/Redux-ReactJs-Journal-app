import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'

import { firebase } from '../../firebase/config';

import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import { AppRouter } from '../../routers/AppRouter';

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = { 
  auth: { },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'ABCD',
    },
    notes: []
  }
};

let store = mockStore( initState );
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />>', () => {

  test('Debe de llamar el login si estoy autenticado', async () => {

    let user;

    await act( async () => {

      const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.cl', '1234567');
      user = userCred.user;
    
      mount(
        <Provider store={ store }>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    console.log({ user });
    expect( login ).toHaveBeenCalledWith( '74mb5MJvGoN3SMz4LbbVI7xPbxq1', null );
  });  
});
