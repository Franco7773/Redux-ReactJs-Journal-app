import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => Promise.resolve('https://hello-galaxy.jpg'))
}));

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


describe('Pruebas con las acciones de notes', () => {

  beforeEach(() => {
    store = mockStore( initState );
  });
  
  test('Debe de crear una nueva nota startNewNote', async () => {
    
    // await store.dispatch( startNewNote());

    const actions = store.getActions();

    expect( actions[0] ).not.toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any( String ),
        title: '',
        body: '',
        date: expect.any( Number )
      }
    });

    expect( actions[1] ).not.toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any( String ),
        title: '',
        body: '',
        date: expect.any( Number )
      }
    });

    // const docID = actions[0].payload.id;

    // await db.doc(`/TESTING/journal/notes/${ docID }`).delete();
  });

  xtest('startLoadingNotes debe cargar las notas', async () => {
    
    await store.dispatch( startLoadingNotes('TESTING'));

    const actions = store.getActions();

    expect( actions[0] ).toEquala({
      type: types.notesLoad,
      payload: expect.any( Array )
    });

    const expected = {
      id: expect.any( String ),
      title: expect.any( String ),
      body: expect.any( String ),
      date: expect.any( Number )
    };

    expect( actions[0].payload[0] ).toMatchObject( expected );
  });

  xtest('Debe de actualizar la nota', async () => {
    
    const note = {
      id: '04jwhd6sj47hd',
      title: 'Título',
      body: 'Cuerpo'
    };

    await store.dispatch( startSaveNote( note ));

    const actions = store.getActions();

    expect( actions[0].type ).toBe( types.notesUpdated );

    const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

    expect( docRef.data().title ).toBe( note.title );
  });

  xtest('startUploading debe de actualizar el url del entry', async () => {
    
    const file = new File([], 'any.jpg');

    await store.dispatch( startUploading( file ));

    const docRef = await db.doc('/TESTING/journal/notes/04jwhd6sj47hd').get();

    expect( docRef.data().url ).toBe('https://hello-galaxy.jpg');
  });
});
