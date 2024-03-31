import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, status: updatingStatus } = useMutation({
    // mutationFn: (newCabin) =>  createCabin(newCabin),
    mutationFn: updateSettingApi,
    // can only pass one element to this fnc in REACT QUERY
    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSetting, updatingStatus };
}
