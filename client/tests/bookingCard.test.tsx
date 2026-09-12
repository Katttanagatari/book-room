import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookingCard from "../src/shared/ui/BookingCard/BookingCard";

describe("BookingCard", () => {
  it("не отображает кнопку 'Отменить' для прошедших бронирований", () => {
    render(
      <BookingCard
        month="ОКТЯБРЬ"
        day="24"
        title="Презентация проекта"
        room="Эверест"
        floor="4 этаж"
        time="15:00–16:00"
        isPast={true}
      />,
    );

    expect(screen.getByText("Презентация проекта")).toBeDefined();
    expect(screen.queryByRole("button", { name: /отменить/i })).toBeNull();
  });
});
