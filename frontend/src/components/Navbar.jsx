import { Pencil } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { logoutApi } from '../lib/authApi';
import CreateNote from './CreateNote';

const Navbar = ({ onNoteCreated }) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlelogout = () => {
        logoutApi();
        toast.success('Logged out successfully');
        navigate('/login');
    }
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
                        <button
                            onClick={handlelogout}
                            className='btn rounded-full btn-sm bg-error text-black hover:bg-red-800 hover:text-primary'
                        >
                            Logout
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
