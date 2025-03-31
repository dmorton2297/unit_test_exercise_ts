/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from "@testing-library/react";
import { useSnakeToCamelCaseMutation } from "./useSnakeToCamelCaseMutation";
import { SetupServerApi } from "msw/node";
import { setupAPIMocks } from "../../../testSetup";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RenderWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

// TODO: Implement test file
describe("useSnakeToCamelCaseMutation", () => {
  let server: SetupServerApi;

  beforeEach(() => {
    server = setupAPIMocks([]);
  });

  afterEach(() => {
    server.close();
  });

  // TODO Implement test case
  it.skip("Should return a successful response", async () => {
    // TODO Setup http mocks
    // Q: How do we render a hook? Hint: look up renderHook for react testing library
    expect(false).toEqual(true);
  });

  // TODO: Implement test case
  it.skip("Should throw an error", async () => {
    // TODO setup http mocks
    // Q: How do we render a hook? Hint: look up renderHook for react testing library
    expect(false).toEqual(true);
  });
});
