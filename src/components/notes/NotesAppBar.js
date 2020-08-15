import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active } = useSelector( state => state.notes );

  const handleSave = () => {
    dispatch( startSaveNote( active ));
  };

  const handlePictureClick = () => {
    // dispatch( startSaveNote( active ));
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = ( e ) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (file) {
      dispatch( startUploading( file ));
    }
  };
  
  return (
    <div className="notes__appbar">
      <span>27 de Agosto 2020</span>

      <input id="fileSelector" onChange={ handleFileChange } type="file" name="file" style={{ display: 'none' }}/>

      <div>
        <button onClick={ handlePictureClick } className="btn">Picture</button>
        <button onClick={ handleSave } className="btn">Save</button>
      </div>
    </div>
  );
}
