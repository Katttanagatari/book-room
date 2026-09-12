import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RoomScheduleError from "../src/features/room-schedule/RoomScheduleError";

describe("RoomScheduleError", () => {
  it("вызывает функцию перезагрузки при нажатии на кнопку повтора", () => {
    const handleRetry = vi.fn();
    render(<RoomScheduleError onRetry={handleRetry} />);

    const retryButton = screen.getByRole("button", {
      name: /попробовать снова/i,
    });
    fireEvent.click(retryButton);

    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
