import axios from 'axios';
import { ArrowLeft, PenSquareIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import EditNote from '../components/EditNote';
import RateLimitedUI from '../components/RateLimitedUI';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { formatDate } from '../lib/utils';


const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setnote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchNote = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
      setnote(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.error('Error fetching note details', error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      }
      else if (error.response?.status === 404) {
        toast.error('Note not found');
        navigate('/');
      }
      else {
        toast.error('Error fetching note details');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
  }, [id]);

  const handleDelete = () => {
    setIsDeleteOpen(true);
  };
  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note', error);
      toast.error('Error deleting note');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='min-h-screen'>
      {isRateLimited &&
        (<div className='flex items-center justify-center h-screen'>
          <div className='w-full'>
            <RateLimitedUI />
          </div>
        </div>
        )}
      <div className='max-w-6xl mx-auto p-4 mt-6'>
        <Link to='/'
          className='inline-flex items-center gap-2 text-primary hover:undeline mb-6'
        >
          <ArrowLeft className='size-4' />
          Back to Notes
        </Link>

        {loading && (
          <div className='text-center text-primary py-10'>Loading...</div>
        )}

        {!loading && note && !isRateLimited && (
          <div className='max-w-4xl overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-sm'>
            <div className='border-b border-base-300 px-5 py-4 sm:px-6'>
              <h1 className='max-w-full [overflow-wrap:anywhere] text-2xl font-bold text-base-content sm:text-3xl'>
                {note.title}
              </h1>
            </div>
            <div className='max-h-[65vh] overflow-y-auto px-5 py-4 sm:px-6'>
              <p className='max-w-full whitespace-pre-wrap [overflow-wrap:anywhere] text-base leading-7 text-base-content/80'>
                {note.content}
              </p>
            </div>
          </div>
        )}

        {!loading && !note && !isRateLimited && (
          <div className='text-center text-base-content/60 py-10'>
            Note not found
          </div>
        )}
      </div>
      {note && !isRateLimited && (
        <div className='fixed bottom-4 right-4 flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-end gap-3 rounded-full bg-base-100/90 px-4 py-3 shadow-lg backdrop-blur sm:bottom-6 sm:right-6'>
          <p className='mr-2 text-right text-xs text-base-content/50 sm:mr-4'>
            Created: {formatDate(new Date(note.createdAt))}
            {note.updatedAt !== note.createdAt && (
              <span> Updated: {formatDate(new Date(note.updatedAt))}</span>
            )}
          </p>
          <button
            onClick={() => setIsEditOpen(true)}
            className='btn btn-circle btn-primary shadow-lg'
          >
            <PenSquareIcon className='size-5' />
          </button>
          <button
            onClick={handleDelete}
            className='btn btn-circle btn-error shadow-lg'
            disabled={isDeleting}
          >
            <Trash2Icon className='size-5' />
          </button>
        </div>
      )}

      <EditNote
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        note={note}
        onNoteUpdated={fetchNote}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={()=>setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default NoteDetailPage;