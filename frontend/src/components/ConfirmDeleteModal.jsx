
const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    isDeleting=false,
    title='Delete note?',
    description='No moore undoing this action once deleted.'
}) => {
    if(!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4'>
        <div className='relative w-full max-w-md rounded-2xl border border-error/20 bg-base-100 p-6 shadow-2xl'>
            <div className='text-center text-base-content pt-2'>
                <p>Are you sure you want to delete this note?</p>
            </div>
            <div className='mt-4 flex items-center justify-center gap-3'>
            <button 
                type='button'
                onClick={onClose}
                className='btn btn-outline rounded-lg'
                disabled={isDeleting}
            >
                Cancel
            </button>
            <button
                type='button'
                onClick={onConfirm}
                className='btn btn-error rounded-lg'
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmDeleteModal