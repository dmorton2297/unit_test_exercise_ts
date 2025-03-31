import { useMutation } from "@tanstack/react-query";

async function fetchSnakeToCamel(request: { input: string }) {
  const response = await fetch("http://localhost:3000/snake_to_camel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error("Failed to update data");
  }
  return response.json();
}

export function useSnakeToCamelCaseMutation(params?: {
  onSuccess?: (data: { camelCase: string }) => void;
}) {
  const mutation = useMutation({
    mutationFn: fetchSnakeToCamel,
    onSuccess: (data: { camelCase: string }) => {
      if (params?.onSuccess) {
        params.onSuccess(data);
      }
    },
  });

  return mutation;
}
