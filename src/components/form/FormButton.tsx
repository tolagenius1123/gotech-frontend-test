import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

type ButtonProps = {
	btnStyles?: string;
	variant?:
		| 'link'
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| null
		| undefined;
	btnType?: 'button' | 'submit' | 'reset' | undefined;
	size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
	btnText?: string;
	isLoading?: boolean;
	IconLeft?: ReactNode;
	IconRight?: ReactNode;
	handleClick?: () => void;
};

const CustomButton = ({
	btnStyles,
	variant,
	btnType,
	size,
	btnText,
	isLoading,
	IconLeft,
	IconRight,
	handleClick,
}: ButtonProps) => {
	return (
		<Button
			variant={variant}
			type={btnType}
			size={size}
			className={btnStyles}
			disabled={isLoading}
			onClick={handleClick}
		>
			{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{' '}
			{!isLoading && IconLeft && <span>{IconRight}</span>} {btnText}{' '}
			{!isLoading && IconRight && <span>{IconRight}</span>}
		</Button>
	);
};

export default CustomButton;
