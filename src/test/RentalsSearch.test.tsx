import { render, screen } from "@testing-library/react";
import { RentalsSearch } from "../pages/RentalsSearch";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import matchers from "@testing-library/jest-dom/matchers";
import { searchRentalsByKeyword } from "../api/getRentals";
expect.extend(matchers);

test("renders search input element", () => {
  render(<RentalsSearch />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toBeInTheDocument();
});

describe("searchRentalsByKeyword", () => {
  test("returns an object with data and meta properties", async () => {
    const result = await searchRentalsByKeyword("car", 10, 10);
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("meta");
  });

  test("data property contains an array of rentals", async () => {
    const result = await searchRentalsByKeyword("car", 10, 10);
    expect(Array.isArray(result.data)).toBe(true);
  });

  test("meta property contains a total number of rentals", async () => {
    const result = await searchRentalsByKeyword("car", 10, 10);
    expect(typeof result.meta.total).toBe("number");
  });

  test("returns correct number of rentals per page", async () => {
    const result = await searchRentalsByKeyword("car", 5, 0);
    expect(result.data.length).toBe(5);
  });
});
