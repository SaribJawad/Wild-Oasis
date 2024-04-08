import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery({
    // uniqly identify this data
    // and when in another component we want to get the data with the same key then the data would be run from the cache as we learned
    queryKey: ["booking", bookingId],
    // fnc responsible for quering and it should return a promise
    queryFn: () => getBooking(bookingId),
  });

  return { booking, isLoading, error };
}
