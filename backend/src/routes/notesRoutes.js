import express from 'express';
import { createNote, deleteNote, getAllNotes, getSpecificNote, updateNote, getNoteById} from '../controllers/notesController.js';
const router = express.Router();

router.get('/', getAllNotes);
router.get('/search', getSpecificNote);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;