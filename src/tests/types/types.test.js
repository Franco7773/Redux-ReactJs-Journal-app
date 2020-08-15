import { types } from '../../types/types';

describe('Pruebas con nuestros types', () => {

  test('Deben de coincidir los tipos', () => {
    
    expect( types ).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',
      uiStartLoading: '[UI] Start Loading',
      uiFinishLoading: '[UI] Finish Loading',
      
      notesAddNew: '[Notes] New Note',
      notesActive: '[Notes] Set Active Note',
      notesLoad: '[Notes] Load Notes',
      notesUpdated: '[Notes] Update Note',
      notesFileUrl: '[Notes] Update Image Url',
      notesDelete: '[Notes] Delete Note',
      notesLogoutCleaning: '[Notes] Logout Cleaning'
    });
  });
});
