import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';

import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';


jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}));

const middlewares = [thunk];

const mockStore = configureStore( middlewares );

const initState = {
  auth: {
    uid: '1',
    name: 'Gianfranco'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 1234,
      title: 'Hello',
      body: 'Galaxy',
      date: 0,
      url: 'https://google.com/photo.jpg'
    },
    notes: []
  }
};

const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={ store }>
    <NoteScreen />
  </Provider>
);

describe('Pruebas en', () => {
   
  test('Debe de mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('Debe de disparar el activeNote', () => {
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Goodbye'
      }
    });

    expect( activeNote ).toHaveBeenLastCalledWith(
      1234,
      {
        id: 1234,
        title: 'Goodbye',
        body: 'Galaxy',
        date: 0,
        url: 'https://google.com/photo.jpg'
      }
    );
  });
});
