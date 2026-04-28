/// <reference types="vite/client" />

import { Lang } from '@store/useLangStore';

export {};

declare global {
  interface Window {
    __INITIAL_DATA__?: any;
    __INITIAL_LANG__?: Lang;
  }
}
