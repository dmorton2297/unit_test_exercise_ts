import { render, screen } from "@testing-library/react";
import { FormResultHistory } from "./FormResultHistory";

describe("FormResultHistory", () => {
  it("Should render", () => {
    render(
      <FormResultHistory
        history={[{ input: "test_input", output: "test_output" }]}
      />
    );

    expect(
      screen.getByText("Input: test_input, Output: test_output")
    ).toBeVisible();
  });
});
