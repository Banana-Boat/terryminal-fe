/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_HOST: string;
  readonly VITE_BASE_PORT: number;

  readonly VITE_TERMINAL_WS_HOST: string;
  readonly VITE_TERMINAL_WS_PORT: number;

  readonly VITE_GATEWAY_HOST: string;
  readonly VITE_GATEWAY_PORT: number;
}
