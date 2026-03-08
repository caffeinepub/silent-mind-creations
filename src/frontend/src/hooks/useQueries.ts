import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllMovieDetails() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["movieDetails"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMovieDetails();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribe() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.subscribe(email);
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, email, message);
    },
  });
}
