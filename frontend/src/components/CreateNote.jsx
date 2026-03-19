import { X } from 'lucide-react';
import { useState } from 'react';
import apiClient from '../lib/apiClient';

const CreateNote = ({ isOpen, onClose, onNoteCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiClient.post('/notes', { title, content });
            setTitle('');
            setContent('');
            onClose();
            onNoteCreated?.();
        } catch (error) {
            console.error('Error creating note');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div className='bg-base-200 rounded-lg p-6 w-full max-w-md mx-4 relative'>
                <button onClick={onClose} className='absolute top-3 right-3 text-base-content/60 hover:text-base-content'>
                    <X className='size-5' />
                </button>

                <h2 className='text-xl font-bold mb-4'>New Note</h2>

                <form onSubmit={handleSubmit}
                    className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='input input-bordered w-full rounded-md'
                            placeholder='Enter the title'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium mb-1'>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className='textarea textarea-bordered w-full h-32 rounded-md'
                            placeholder='Type Something...'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-primary w-full rounded-md'
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;