import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // mutate (callback fnc whcih we will connect with the call back fnc)
  const { status, mutate: deleteCabin } = useMutation({
    // function React query will call
    mutationFn: deleteCabinApi,
    // with this we can tell react query what to do as soon as the mutation was successful (we want to refetch which we can by doing invalidate which we will call on query client)
    onSuccess: () => {
      toast.success("cabin deleted");
      queryClient.invalidateQueries({
        // now tell here which exact data should we validate
        queryKey: ["cabins"],
      });
    },
    // get access to that exact error in the mutation fnc (deleteCabin)
    onError: (err) => toast.error(err.message),
  });
  const isDeleting = status === "pending";

  return { isDeleting, deleteCabin };
}
