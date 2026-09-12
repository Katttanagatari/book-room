import { renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDate from "../src/shared/hooks/useDate";

describe("useDate Hook", () => {
  it("возвращает mindate как сегодняшнюю дату и maxdate ровно через 30 дней", () => {
    const { result } = renderHook(() => useDate());

    const { minDate, maxDate } = result.current;

    const diffInMs = maxDate.getTime() - minDate.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

    expect(diffInDays).toBe(30);
  });
});
