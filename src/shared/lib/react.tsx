import {
  Children,
  createContext,
  createElement,
  isValidElement,
  useContext,
  useEffect,
} from 'react';
import { useMediaQuery } from 'usehooks-ts';

import type { Context, EffectCallback, ReactNode } from 'react';

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context);
  if (value === null) throw new Error('Strict context not passed');
  return value as T;
}

/**
 * Reference:
 * https://github.com/streamich/react-use/blob/master/src/useEffectOnce.ts
 */
export const useEffectOnce = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

/**
 * Reference:
 * https://github.com/streamich/react-use/blob/master/src/useMount.ts
 */
export const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

/**
 * Try to avoid this hook by using styles, if neccessary component should be wrapped in NoSSR \shared\ui\NoSSR.tsx
 */
export const useResponsive = () => {
  // useMediaQuery works unstable with SSR
  // https://github.com/chakra-ui/chakra-ui/issues/3124#issuecomment-799380374
  // https://github.com/vercel/next.js/discussions/14810#discussioncomment-61177
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = !isDesktop;

  return { isDesktop, isMobile };
};

export function createStrictContext<T>() {
  return createContext<T | null>(null);
}

export function ComposeChildren({ children }: { children: ReactNode }) {
  const array = Children.toArray(children);
  const last = array.pop();
  return (
    <>
      {array.reduceRight(
        (child, element) =>
          isValidElement(element)
            ? createElement(element.type, element.props, child)
            : child,
        last,
      )}
    </>
  );
}
