import { useForm, SubmitHandler } from "react-hook-form";
import { useSnakeToCamelCaseMutation } from "../../hooks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type Inputs = {
  word: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const zSnakeToCamelCaseFormSchema = z.object({
  word: z.string().min(1),
});
export type SnakeToCamelCaseFormSchema = z.infer<
  typeof zSnakeToCamelCaseFormSchema
>;

export function SnakeToCamelCaseForm(props: {
  onSubmitSuccess?: (params: { input: string; output: string }) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<SnakeToCamelCaseFormSchema>({
    resolver: zodResolver(zSnakeToCamelCaseFormSchema),
  });

  const [successfulSubmitCount, setSuccssfulSubmitCount] = useState(0);

  const mutation = useSnakeToCamelCaseMutation({
    onSuccess: () => {
      resetField("word");
      setSuccssfulSubmitCount(successfulSubmitCount + 1);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await mutation.mutateAsync({ input: data.word });
    if (props.onSubmitSuccess)
      props.onSubmitSuccess({ input: data.word, output: result.camelCase });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{ display: "flex", flexDirection: "column", width: 500, gap: 5 }}
      >
        <label htmlFor="word">Enter a snake case string</label>
        <input defaultValue="" {...register("word")} id="word" />
        {errors.word && <span>{errors.word.message}</span>}
        <button type="submit">Submit</button>
        <p>{`Successful submit count: ${successfulSubmitCount}`}</p>
      </div>
    </form>
  );
}
