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

describe("useSnakeToCamelCaseMutation", () => {
  let server: SetupServerApi;

  beforeEach(() => {
    server = setupAPIMocks([]);
  });
  afterEach(() => {
    server.close();
  });

  it("Should return a successful response", async () => {
    setupAPIMocks([
      http.post("/snake_to_camel", () => {
        return HttpResponse.json({
          camelCase: "mockReturnValue",
        });
      }),
    ]);
    const hook = renderHook(() => useSnakeToCamelCaseMutation(), {
      wrapper: RenderWrapper,
    });
    const result = await hook.result.current.mutateAsync({ input: "test" });
    expect(result.camelCase).toBe("mockReturnValue");
  });

  it("Should throw an error", async () => {
    setupAPIMocks([
      http.post("/snake_to_camel", () => {
        return new HttpResponse(undefined, {
          status: 500
        });
      }),
    ]);
    try {
      const hook = renderHook(() => useSnakeToCamelCaseMutation(), {
        wrapper: RenderWrapper,
      });
      await hook.result.current.mutateAsync({ input: "test" });
      throw Error("This should be unreachable");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
