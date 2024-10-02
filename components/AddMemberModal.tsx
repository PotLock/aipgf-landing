import { NextPage } from 'next';
import { useState } from 'react';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMember: (memberId: string) => void;
    existingMembers: string[];
}

const AddMemberModal: NextPage<AddMemberModalProps> = ({ isOpen, onClose, onAddMember, existingMembers }) => {
    const [memberId, setMemberId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (memberId.trim() && !existingMembers.includes(memberId.trim())) {
            onAddMember(memberId.trim());
            setMemberId('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-5 py-3 w-1/4">
                <div className="flex justify-between items-center mb-4">
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='bg-gray-100 bg-opacity-20 rounded-full p-2 w-8 h-8 flex justify-center items-center'>
                            <img className='w-5 h-5' src="/assets/icon/group.svg" alt="icon" width={20} height={20} />
                        </div>
                        <h2 className="text-xl font-bold">Add team members</h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 bg-white cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">Add NEAR account IDs for your team members.</p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="NEAR account ID"
                        className="flex-grow px-3 py-2 border-[1px] border-aipgf-geyser border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-black font-bold text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                        Add
                    </button>
                </form>
                <div className="mt-4">
                    <p className="text-sm text-gray-600">{existingMembers.length} members</p>
                    {existingMembers.map((member, index) => (
                        <div key={index} className="mt-2 text-sm">{member}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;