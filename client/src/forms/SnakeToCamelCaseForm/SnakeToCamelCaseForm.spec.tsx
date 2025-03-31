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
    return HttpResponse.json({
      camelCase: "mockReturnValue",
    });
  }),
];

export const errorHandler = [
  http.post("/snake_to_camel", () => {
    return new HttpResponse(null, { status: 500 });
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

  it("Should render", async () => {
    setupAPIMocks(handlers);
    render(<SnakeToCamelCaseForm />, {
      wrapper: RenderWrapper,
    });
    const input = screen.getByLabelText("Enter a snake case string");
    expect(input).toBeInTheDocument();
    fireEvent.input(input, { target: { value: "a_test_value" } });
    fireEvent.click(screen.getByText("Submit"));
    expect(await screen.findByText("Successful submit count: 1")).toBeVisible();
  });

  it("Should show a validation error", async () => {
    setupAPIMocks(handlers);
    render(<SnakeToCamelCaseForm />, {
      wrapper: RenderWrapper,
    });
    fireEvent.click(screen.getByText("Submit"));
    expect(
      await screen.findByText("String must contain at least 1 character(s)")
    ).toBeVisible();
  });
});
