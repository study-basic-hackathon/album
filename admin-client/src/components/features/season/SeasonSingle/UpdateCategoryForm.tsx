import { useForm } from "react-hook-form";
import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import Alert from "@/components/parts/Alert";
import type { UseMutationResult } from "@tanstack/react-query";

type FormValues = {
  name: string;
};

type Mutation = UseMutationResult<void, Error, FormValues, unknown>;

export default function UpdateSeasonForm({
  season,
  mutation,
}: {
  season: { id: number; name: string };
  mutation: Mutation
}) {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      name: season.name,
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutateAsync(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
      <InputField
        label="季節名"
        type="text"
        {...register("name", { required: true })}
      />
      {mutation.isError && (
        <Alert variant="error" message={mutation.error?.message ?? "更新に失敗しました"} />
      )}
      {mutation.isSuccess && (
        <Alert variant="success" message="季節を更新しました" />
      )}
      {mutation.isPending && (
        <Alert variant="default" message="更新中…" />
      )}
      <div>
        <Button type="submit" variant="primary">
          更新
        </Button>
      </div>
    </form>
  );
}
