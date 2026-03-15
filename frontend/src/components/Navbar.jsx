import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Link } from 'react-router';
import CreateNote from './CreateNote';

const Navbar = ({ onNoteCreated }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
        <header className='bg-base-300 border-b border-base-content/10 rounded-full m-4 ml-8 mr-8'>
            <div className='mx-auto max-w-7xl p-2'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-2xl font-bold text-primary tracking-tight'>Notes</h1>
                    <div className='flex items-center gap-10 '>
                        <button onClick={()=>setIsModalOpen(true)}>
                            <Pencil className='size-5' />
                        </button>                        
                    </div>
                </div>
            </div>
        </header>

        <CreateNote 
            isOpen={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
            onNoteCreated={onNoteCreated}
        />
        </>
    );
};

export default Navbar;
