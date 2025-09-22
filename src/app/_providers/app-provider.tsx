'use client';

import { Provider } from 'react-redux';

import { ComposeChildren } from '@/shared/lib/react';
import { store } from '@/shared/lib/redux';

import type { ReactNode } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      {/* eslint-disable-next-line react/no-children-prop */}
      <Provider store={store} children={null} />
      {children}
    </ComposeChildren>
  );
}
