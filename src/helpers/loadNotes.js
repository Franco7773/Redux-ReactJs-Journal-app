import { db } from "../firebase/config"

export const loadNotes = async ( uid ) => {

  const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
  const notes = [];

  notesSnap.forEach( sonSnap => {
    notes.push({ id: sonSnap.id, ...sonSnap.data() });
  });

  return notes;
}
