import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      // manually setting the data to the cache
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },
    //  grabing the error which the mutation fnc will return
    onError: (err) => {
      console.log(err, "err");
      toast.error("Provided email or password is incorrect");
    },
  });

  const isLoading = status === "pending";

  return { login, isLoading };
}
