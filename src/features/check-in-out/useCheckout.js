import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    // as we know mutation fnc only take one parameters
    mutationFn: (bookingId) =>
      // takes id and the new obj changes
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    //   onsucces can get the data which the mutation function react
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked out`);
      // rather than query key we can also pass in the active prop which will invalidate all the currently active queries
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
