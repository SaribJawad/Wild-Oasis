import { useQuery } from "@tanstack/react-query";
import getCabins from "../../services/apiCabins";

export function useCabin() {
  const {
    data: cabins,
    isLoading,
    error,
  } = useQuery({
    // uniqly identify this data
    // and when in another component we want to get the data with the same key then the data would be run from the cache as we learned
    queryKey: ["cabins"],
    // fnc responsible for quering and it should return a promise
    queryFn: getCabins,
  });

  return { cabins, isLoading, error };
}
