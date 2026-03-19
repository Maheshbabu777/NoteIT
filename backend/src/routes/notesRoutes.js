import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createNote, deleteNote, getAllNotes, getSpecificNote, updateNote, getNoteById} from '../controllers/notesController.js';
const router = express.Router();

router.get('/', protect, getAllNotes);
router.get('/search', protect, getSpecificNote);
router.get('/:id', protect, getNoteById);
router.post('/', protect, createNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);


export default router;