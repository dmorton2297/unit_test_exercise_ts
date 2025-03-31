import "@testing-library/jest-dom";
import { vi } from "vitest";
import { setupServer } from "msw/node";
import { RequestHandler } from "msw";

export const setupAPIMocks = (handlers: RequestHandler[]) => {
  const server = setupServer(...handlers);

  server.listen({
    onUnhandledRequest: 'bypass'
  });
  
  return server;
};

/**
 *  Work around for `vi.useFakeTimers` not working with RTL
 *
 * @see https://github.com/vitest-dev/vitest/issues/3117#issuecomment-1493249764
 */
// @ts-expect-error not needed
globalThis.jest = vi;
