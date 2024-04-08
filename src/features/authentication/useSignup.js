import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, status } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "Account succesfully created! Please verify the new account from the user's email address."
      );
    },
  });

  const isLoading = status === "pending";

  return { signup, isLoading };
}
