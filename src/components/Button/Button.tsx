// import { FC } from 'react';
import { Tooltip } from '@fluentui/react-components';
import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

// alternative component definition
// export const ButtonAlt: FC<ButtonProps> = ({ className, children, ...props }) => {
// 	return (
// 		<button className={cn('button accent', className)} {...props}>{children}</button>
// 	);
// }

function Button({ children, className, appearence = 'small', tooltip = 'Tooltip',...props }: ButtonProps) {
	return (
		<Tooltip content={tooltip} relationship='label'>
			<button className={cn(styles['button'], styles['accent'], className, {
				[styles['small']]: appearence === 'small',
				[styles['big']]: appearence === 'big'
			})} {...props}>{children}</button>
		</Tooltip>

	);
}

export default Button;