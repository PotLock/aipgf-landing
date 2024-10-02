import { NextPage } from 'next';
import { useState } from 'react';
import AvatarProfile from './AvatarProfile';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddMember: (memberId: string) => void;
    existingMembers: string[];
    onRemoveMember: (memberId: string) => void;
}

const AddMemberModal: NextPage<AddMemberModalProps> = ({ isOpen, onClose, onAddMember, existingMembers, onRemoveMember }) => {
    const [memberId, setMemberId] = useState<string>('');
    const [error, setError] = useState<string>('');

    const validateNearAddress = (address:string) => {
        const NEAR_ACCOUNT_ID_REGEX =
            /^(?=.{2,64}$)(?!.*\.\.)(?!.*-$)(?!.*_$)[a-z\d._-]+$/i;
        let isValid = NEAR_ACCOUNT_ID_REGEX.test(address);
        // Additional ".near" check for IDs less than 64 characters
        if ((address.length < 64 && !address.endsWith(".near"))) {
            isValid = false;
        }
        return isValid;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMemberId = memberId.trim();
        if (trimmedMemberId && !existingMembers.includes(trimmedMemberId)) {
            if (validateNearAddress(trimmedMemberId)) {
                onAddMember(trimmedMemberId);
                setMemberId('');
                setError('');
            } else {
                setError('Invalid NEAR account ID format');
            }
        } else if (existingMembers.includes(trimmedMemberId)) {
            setError('This member is already in the team');
        } else {
            setError('Please enter a valid NEAR account ID');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberId(e.target.value);
        setError('');
    };

    const handleRemoveMember = (memberToRemove: string) => {
        onRemoveMember(memberToRemove);
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-hidden">
            <div className="bg-white rounded-lg p-5 py-3 w-1/3 shadow-sm">
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
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={memberId}
                            onChange={handleInputChange}
                            placeholder="NEAR account ID"
                            className="flex-grow px-3 py-2 border-[1px] border-aipgf-geyser border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-gray-800"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black font-bold text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        >
                            Add
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </form>
                <div className="mt-4">
                    <p className="text-sm text-gray-600"><strong>{existingMembers.length}</strong> members</p>
                    {existingMembers.map((member, index) => (
                        <div key={index} className='flex flex-row justify-between gap-2 items-center border-t-[1px] border-aipgf-geyser border-solid py-3 mt-2 group'>
                            <div className='flex flex-row gap-2 items-center'>
                                <AvatarProfile accountId={member} size={32} />
                                <div className='text-sm text-gray-600'>@{member}</div>
                            </div>
                            <button onClick={() => handleRemoveMember(member)} className='bg-white cursor-pointer p-2 group-hover:block hidden font-bold'>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;