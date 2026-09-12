import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BookingTime from "../src/shared/ui/BookingTime/BookingTime";

describe("BookingTime Mask", () => {
  it("автоматически подставляет ':' при вводе времени", () => {
    const handleChange = vi.fn();
    render(<BookingTime value="" onChange={handleChange} disable={false} />);

    const input = screen.getByPlaceholderText("--:--");
    fireEvent.change(input, { target: { value: "1530" } });

    expect(handleChange).toHaveBeenCalledWith("15:30");
  });

  it("игнорирует нечисловые символы", () => {
    const handleChange = vi.fn();
    render(<BookingTime value="" onChange={handleChange} disable={false} />);

    const input = screen.getByPlaceholderText("--:--");
    fireEvent.change(input, { target: { value: "ab12cd" } });

    expect(handleChange).toHaveBeenCalledWith("12");
  });
});
