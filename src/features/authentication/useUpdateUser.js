import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, status } = useMutation({
    // mutationFn: (newCabin) =>  createCabin(newCabin),
    mutationFn: updateCurrentUser,
    // can only pass one element to this fnc in REACT QUERY
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      //manually setting the cache
      queryClient.setQueryData(["user"], user);
      //   queryClient.invalidateQueries({
      //     queryKey: ["user"],
      //   });
    },
    onError: (err) => toast.error(err.message),
  });

  const isUpdating = status === "pending";

  return { updateUser, isUpdating };
}
