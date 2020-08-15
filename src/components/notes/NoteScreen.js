import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );
  const [{ id, body, title, date, url }, handleInputChange, reset ] = useForm( note );
  const activeId = useRef( note.id );

  useEffect(() => {

    if (note.id !== activeId.current) {
      reset( note );
      activeId.current = note.id
    }
  }, [ reset, note ]);

  useEffect(() => {
  
    dispatch( activeNote( id, { id, title, body, date, url }));
  
  }, [ dispatch, id, title, body, date, url ]);
  
  const handleDelete = () => {
    dispatch( startDeleting( id ));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input value={ title } onChange={ handleInputChange } name="title" type="text" className="notes__content--title-input" autoComplete="off" placeholder="Some awesome title"></input>

        <textarea value={ body } onChange={ handleInputChange } name="body" className="notes__content--textarea" placeholder="What happened today?"></textarea>

        { url &&
          <div className="notes__content--image">
            <img alt="imagen" src={ url } />
          </div>
        }
      </div>

      <button onClick={ handleDelete } className="btn btn--danger">Delete</button>
      
    </div>
  );
}
