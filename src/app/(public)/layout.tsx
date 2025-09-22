import { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';
import { Toaster } from '@/shared/ui/sonner';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className={'bg-black text-white min-h-[100vh]'}>
      <main className={cn('w-full h-full')}>{children}</main>
      <Toaster />
    </div>
  );
}
