import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom'

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginWithEmailAndPassword } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginWithEmailAndPassword: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = { 
  auth: { },
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore( initState );
store.dispatch = jest.fn();
const eventClick = {
  preventDefault: jest.fn()
};

const wrapper = mount(
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);

describe('Pruebas en <LoginScreen />', () => {

  beforeEach(() => {
    store = mockStore( initState );
    jest.clearAllMocks();
  });

  test('Debe de mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot();
  });

  test('Debe de disparar la acción', () => {
    
    wrapper.find('.google-btn').prop('onClick')( eventClick );

    expect( startGoogleLogin ).toHaveBeenCalled();
  });

  test('Debe de disparar el startLogin con los respectivos argumentos', () => {
    
    wrapper.find('form').prop('onSubmit')( eventClick );

    expect( startLoginWithEmailAndPassword ).toHaveBeenCalledWith('gian7773@gmail.com', '1234567');
  })
  
});
