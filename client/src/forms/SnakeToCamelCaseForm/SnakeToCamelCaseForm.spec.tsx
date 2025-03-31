/* eslint-disable @typescript-eslint/no-unused-vars */
import { fireEvent, render, screen } from "@testing-library/react";
import { SnakeToCamelCaseForm } from "./SnakeToCamelCaseForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setupAPIMocks } from "../../../testSetup";
import { http, HttpResponse } from "msw";
import { SetupServerApi } from "msw/node";

const RenderWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export const handlers = [
  http.post("/snake_to_camel", () => {
    return HttpResponse.json({}); // TODO: Return proper mocked data
  }),
];

describe("SnakeToCamelCaseForm", () => {
  let server: SetupServerApi;

  beforeEach(() => {
    server = setupAPIMocks([]);
  });

  afterEach(() => {
    server.close();
  });


  // TODO: Implement test case
  it.skip("Should allow entering data and show submit counter incrementing", async () => {
    setupAPIMocks(handlers);
    expect(false).toEqual(true); // Implement test body
  });

  // TODO: Implement test case
  it("Should show requires at least one character validation message", async () => {
    setupAPIMocks(handlers);
    expect(false).toEqual(true); // Implement test body
  });
});
