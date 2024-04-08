import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    // as we know mutation fnc only take one parameters
    mutationFn: ({ bookingId, breakfast }) =>
      // takes id and the new obj changes
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    //   onsucces can get the data which the mutation function react
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfuly checked in`);
      // rather than query key we can also pass in the active prop which will invalidate all the currently active queries
      queryClient.invalidateQueries({ active: true });
      navigate(`/`);
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
