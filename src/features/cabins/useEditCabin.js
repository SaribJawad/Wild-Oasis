import { QueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const { mutate: editCabin, status: editingStatus } = useMutation({
    // mutationFn: (newCabin) =>  createCabin(newCabin),
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    // can only pass one element to this fnc in REACT QUERY
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      QueryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, editingStatus };
}
