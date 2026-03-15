import axios from 'axios';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { formatDate } from '../lib/utils';
import EditNote from './EditNote';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const NoteCard = ({ note, onNoteUpdated, onNoteDeleted }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditOpen(true);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDeleteOpen(true);
    };

    const confirmDelete = async () => {
        setIsDeleting(true);

        try {
            await axios.delete(`http://localhost:5001/api/notes/${note._id}`);
            toast.success('Note deleted successfully');
            onNoteDeleted?.();
            setIsDeleteOpen(false);
        } catch (error) {
            console.error('Error deleting note');
            toast.error('Error deleting note');
        } finally {
            setIsDeleting(false);
        }
    };
    return (
        <>
            <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#02497e]'>
                <div className='card-body bg-slate-200'>
                    <h3 className='card-title text-base-content'>{note.title}</h3>
                    <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                    <div className='card-actions justify-between items-center mt-4'>
                        <span className='text-sm text-base-content/60'>
                            {formatDate(new Date(note.createdAt))}
                        </span>
                        <div className='flex items-center gap-1'>
                            <button onClick={handleEdit} className='btn btn-ghost btn-xs'>
                                <PenSquareIcon className='size-4' />
                            </button>
                            <button
                                onClick={handleDelete}
                                className='btn btn-ghost btn-xs text-error'
                                disabled={isDeleting}
                            >
                                <Trash2Icon className='size-4' />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
            <EditNote
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                note={note}
                onNoteUpdated={onNoteUpdated}
            />
            <ConfirmDeleteModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={confirmDelete}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default NoteCard;