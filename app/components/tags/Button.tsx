import cn from 'classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

interface IButton
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  color?: 'blue' | 'black' | 'gray' | 'green' | 'white' | 'transparent';
}

export const Button: FC<IButton> = ({ children, color = 'blue', className, ...props }) => {
  return (
    <span>
      <button
        className={cn(
          'rounded-md px-3 py-2',
          {
            ['bg-blue-700']: color === 'blue',
            ['bg-black']: color === 'black',
            ['bg-gray-700']: color === 'gray',
            ['bg-green-600']: color === 'green',
            ['bg-gray-200']: color === 'white',
            ['bg-transparent']: color === 'transparent',
          },
          className,
        )}
        {...props}>
        {children}
      </button>
    </span>
  );
};
