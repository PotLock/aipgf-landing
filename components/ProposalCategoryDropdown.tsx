import React from 'react';
import Image from 'next/image';
import { ProposalCategoryDropdownProps } from '../types/types';

const ProposalCategoryDropdown: React.FC<ProposalCategoryDropdownProps> = ({
    options,
    selectedOption,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return (
        <div className="relative">
            <div
                className="flex items-center space-x-2 mt-2 border-[1px] border-aipgf-geyser border-solid box-border rounded-lg px-2 justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-center gap-4">
                <div className={`flex items-center justify-center w-9 h-9 ${selectedOption.bgColor} rounded-full`}/>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold">{selectedOption.title}</p>
                    <p className="text-xs text-gray-500 -mt-2">{selectedOption.description}</p>
                </div>
                </div>
                <div className="text-sm text-gray-500">
                <Image
                    width={25}
                    height={25}
                    src="/assets/icon/arrow-down-gray.svg"
                    alt="icon"
                    className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-[1px] border-aipgf-geyser border-solid box-border shadow-sm rounded-lg">
                {options.map((option, index) => (
                    <div
                    key={index}
                    className="flex items-center px-2 cursor-pointer"
                    onClick={() => {
                        onSelect(option);
                        setIsOpen(false);
                    }}
                    >
                    <div className={`flex items-center justify-center w-8 h-8 ${option.bgColor} rounded-full mr-4`}/>
                    <div>
                        <p className="text-sm font-semibold">{option.title}</p>
                        <p className="text-xs text-gray-500 -mt-2">{option.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default ProposalCategoryDropdown;