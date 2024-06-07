import React from 'react';

type InputProps =
	| {
			type: 'text' | 'number';
			placeholder?: string;
			value: string | number;
			error: string;
			disabled?: boolean;
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
			onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	  }
	| {
			type: 'file';
			label: string;
			accept: string;
			disabled?: boolean;
			onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	  }
	| {
			type: 'select';
			options: { value: string; label: string }[];
			disabled?: boolean;
			placeholder?: string;
			onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;		
	 };

const DynamicInput: React.FC<InputProps> = (props) => {
	switch (props.type) {
		case 'text':
		case 'number':
			return (
				<div className="relative">
					<input
						type={props.type}
						placeholder={props.placeholder}
						value={props.value}
						onChange={props.onChange}
						className={`border text-font-color bg-primary ${
							props.error
								? 'border-red-500'
								: 'border-border-color'
						}  p-2 rounded-lg w-full`}
					/>
					{props.error && (
						<span className="text-red-500 absolute left-0 bottom-[-25px]">
							{props.error}
						</span>
					)}
				</div>
			);
		case 'file':
			return (
				<div>
					<input
						type="file"
						id="file-input"
						onChange={props.onChange}
						className="hidden"
						disabled={props.disabled}
					/>
					<label
						htmlFor="file-input"
						className="bg-input-bg hover:bg-secondary hover-transition text-font-color p-3 cursor-pointer"
					>
						{props.label}
					</label>
				</div>
			);
		case 'select':
			return (
				<select
					onChange={props.onChange}
					className="border px-3 py-2 border-border-color text-font-color w-full bg-primary"
				>
					<option selected disabled>
						{props.placeholder}
					</option>
					{props.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			);
		default:
			return null;
	}
};

export default DynamicInput;
