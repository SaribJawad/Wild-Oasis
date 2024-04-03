import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBooking() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : [{ field: "status", value: filterValue, method: "eq" }];

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // to refetch the data or change of filter we can also add other values to the queryKey
    // now we can think of this array as the dependency array of USE QUERY
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
}
