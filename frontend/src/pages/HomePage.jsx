import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import RateLimitedUI from '../components/RateLimitedUI';
import apiClient from '../lib/apiClient';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await apiClient.get('/notes');
      console.log(res.data);
      setNotes(res.data);
      setIsRateLimited(false);
    } catch (error) {
      console.log("Error fetching notes");
      if (error.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Error fetching notes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    
    const loadNotes = async () => {
      try {
        const res = await apiClient.get('/notes');
        if (!ignore) {
          console.log(res.data);
          setNotes(res.data);
          setIsRateLimited(false);
          setLoading(false);
        }
      } catch (error) {
        if (!ignore) {
          console.log("Error fetching notes");
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Error fetching notes");
          }
          setLoading(false);
        }
      }
    };
    
    loadNotes();
    
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className='h-screen overflow-auto'>

      <Navbar onNoteCreated={fetchNotes} />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>}

        {!loading && notes.length === 0 && !isRateLimited && (
          <div className='text-center text-base-content/60 py-10'>
            No notes yet. Click the pencil icon to create one!
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
              notes.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onNoteUpdated={fetchNotes}
                  onNoteDeleted={fetchNotes}
                />
              ))
            }
          </div>
        )}
      </div>

    </div>
  );
};

export default HomePage;