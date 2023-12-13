import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

interface IPTag
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  color?: 'blue' | 'black' | 'gray' | 'green' | 'white';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
}

export const PTag: FC<IPTag> = ({ children, color = 'white', size = 'base', className, ...props }) => {
  return (
    <p
      className={cn('text-xl', className, {
        ['text-blue-700']: color === 'blue',
        ['text-black']: color === 'black',
        ['text-gray-700']: color === 'gray',
        ['text-green-600']: color === 'green',
        ['text-gray-200']: color === 'white',
        ['text-xs']: size === 'xs',
        ['text-sm']: size === 'sm',
        ['text-base']: size === 'base',
        ['text-lg']: size === 'lg',
        ['text-xl']: size === 'xl',
      })}
      {...props}>
      {children}
    </p>
  );
};
