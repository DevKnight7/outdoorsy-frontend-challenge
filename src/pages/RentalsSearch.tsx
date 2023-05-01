import { ChangeEvent, useState, useEffect } from "react";
import { searchRentalsByKeyword } from "../api/getRentals";
import { useDebounce } from "use-debounce";
import Card from "../components/Card";
import Rentals from "../types/rentals";
import "../styles/vehiclesSearchPageStyles.css";

interface SearchResult {
  data: Rentals[];
  meta: {
    total: number;
  };
}

export function RentalsSearch() {
  const [searchText, setSearchText] = useState<string>("");
  const [rentals, setRentals] = useState<Rentals[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResult, setTotalResult] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const limitPerPage = 10;
  const totalPages = Math.ceil(totalResult / limitPerPage);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        setLoading(true);
        const result: SearchResult = await searchRentalsByKeyword(
          debouncedSearchText,
          limitPerPage,
          offset
        );
        const { data, meta } = result;
        setRentals(data);
        setTotalResult(meta.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, [debouncedSearchText, limitPerPage, offset]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * limitPerPage);
  };

  const handleClearSearchText = () => {
    setCurrentPage(1);
    setSearchText("");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="input-field"
        // value={searchText}
        defaultValue={searchText}
        onChange={handleSearch}
      />
      {searchText && (
        <button className="clear-btn" onClick={handleClearSearchText}>
          Clear
        </button>
      )}

      <div className="pagination-container">
        {totalPages > 1 &&
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-button ${
                currentPage === page ? "active-pagination-button" : ""
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
      </div>

      {loading ? (
        <div className="loader-container">
          <p>Loading ... </p>
        </div>
      ) : rentals.length ? (
        rentals.map((card) => (
          <Card
            key={card.id}
            text={card?.attributes?.name}
            image={card?.attributes?.primary_image_url}
          />
        ))
      ) : (
        <p>No rental found against your keyword</p>
      )}
    </div>
  );
}
