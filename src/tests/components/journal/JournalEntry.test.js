import React from 'react';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';


jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}));

const middlewares = [thunk];

const mockStore = configureStore( middlewares );

const initState = { };

const store = mockStore( initState );
store.dispatch = jest.fn();

const note = {
  id: 11,
  date: 0,
  title: 'Hello',
  body: 'Galaxy',
  url: 'https://google.com/photo.jpg'
};

const wrapper = mount(
  <Provider store={ store }>
    <JournalEntry {...note } />
  </Provider>
);

describe('Pruebas en <JournalEntry />', () => {
  
  test('Debe de mostrarse correctamente', () => {
    
    expect( wrapper ).toMatchSnapshot();
  });

  test('Debe de activar la nota', () => {
    
    wrapper.find('.journal__entry').prop('onClick')();

    expect( store.dispatch ).toHaveBeenCalled(
      activeNote( note.id, {...note })
    );
  });
});
