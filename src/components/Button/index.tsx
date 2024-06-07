import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	variant?: 'outlet' | 'solid';
	className?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'outlet',
	className,
	...res
}) => {
	const variantClasses = {
		outlet: 'hover:bg-tertiary',
		solid: 'bg-primary border border-border-color hover:bg-background',
	};

	const buttonClasses = variantClasses[variant];

	return (
		<button
			{...res}
			className={`px-[6px] py-1 hover-transition ${className} ${buttonClasses}`}
		>
			{children}
		</button>
	);
};

export default Button;
