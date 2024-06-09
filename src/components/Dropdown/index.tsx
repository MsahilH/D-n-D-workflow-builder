import React, { useState } from 'react';

interface DropdownProps {
    children: React.ReactNode;
    variant?: 'outlet' | 'solid';
    className?: string;
    onClick?: () => void;
    options: string[];
    onSelect: (option: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    children,
    variant = 'outlet',
    className,
    options,
    onSelect,
    ...res
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        onSelect(option);
        setIsOpen(false);
    };

    const variantClasses = {
        outlet: 'hover:bg-tertiary',
        solid: 'bg-primary border border-border-color hover:bg-background',
    };

    const buttonClasses = variantClasses[variant];

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                {...res}
                onClick={toggleDropdown}
                className={`px-[6px] py-1 hover-transition ${buttonClasses}`}
            >
                {children}
            </button>
            {isOpen && (
                <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
