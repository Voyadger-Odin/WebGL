import { cn } from '@/shared/lib/utils';

import type { MouseEventHandler, ReactNode } from 'react';

export const MenuButton = ({
  label,
  active,
  children,
  onClick,
}: {
  label?: string;
  active?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-center gap-1 border border-[#0000] px-2 p-1 cursor-pointer rounded-full',
        'text-[14px]',
        'min-w-[31px] h-[31px]',
        label && 'px-2',
        !active && 'hover:border hover:border-[#fff3] hover:bg-[#fff2]',
        'transition duration-300',
        active && 'border border-[#fff3] bg-[#fff3]',
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const Separator = () => {
  return <div className={cn('h-[25px] w-[1px] bg-[#fff3]')} />;
};

export const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn('flex items-center justify-center p-2 w-full')}>
      <div
        className={cn(
          'flex flex-row gap-1 items-center',
          'bg-black p-1 rounded-full',
          'border border-[#fff3]',
          'shadow-[#000f] shadow-md',
        )}
      >
        {children}
      </div>
    </div>
  );
};
