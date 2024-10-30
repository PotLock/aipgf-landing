import React, { useState } from 'react';
import { DropdownProps } from '@/types/types';

const Dropdown: React.FC<DropdownProps> = ({
    options,
    defaultValue,
    onChange,
    buttonClassName,
    labelClassName,
    fullLabel,
    iconSrc,
    iconWidth,
    modalClassName
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };


    return (
        <div className="relative inline-block text-left font-aipgf-manrope-semibold-1356">
            <div>
                <button
                type="button"
                onClick={toggleDropdown}
                className={buttonClassName || "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"}
                >
                <span className={labelClassName}>
                    {fullLabel}{selectedOption}
                </span>
                {iconSrc && (
                    <img
                    src={iconSrc}
                    alt="dropdown icon"
                    width={iconWidth || 20}
                    className="ml-2"
                    />
                )}
                </button>
            </div>

            {isOpen && (
                <div className={`origin-top-right absolute right-0 mt-2 ${modalClassName?modalClassName:"w-44"} rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options&&options.map((option) => (
                        <span
                            key={option.label}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-opacity-10 cursor-pointer flex items-center"
                            role="menuitem"
                            onClick={() => handleOptionClick(option.label)}
                        >
                            {option?.icon && (
                                <img
                                    src={option.icon}
                                    alt="dropdown icon"
                                    width={13}
                                    className="mr-2"
                                />
                            )}
                            {option.label}
                        </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
