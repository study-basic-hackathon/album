import { format } from "date-fns";

import Breadcrumb from "@/components/parts/Breadcrumb";
import { createExhibition } from "@/api/exhibition";
import { useForm } from "react-hook-form";
import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import Card from "@/components/parts/Card";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Alert from "@/components/parts/Alert";
import { useCreateExhibitionMutation } from "@/hooks/exhibition";

type FormValues = Parameters<typeof createExhibition>[0];

export default function ExhibitionCollection() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      name: "",
      started_date: format(new Date(), "yyyy-MM-dd"),
      ended_date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const mutation = useCreateExhibitionMutation();

  const onSubmit = handleSubmit(async (data) => {
    const id = await mutation.mutateAsync(data);
    const to = `/exhibitions/${id}`;
    navigate(to);
  });

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "花展", to: "/exhibitions" },
            { label: "花展の作成", to: "/exhibitions/new" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">花展の作成</h1>
      </div>
      <Card>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
          <InputField
            label="花展名" type="text" className="max-w-72"
            autoFocus
            {...register("name", { required: true })} />
          <InputField
            label="開始日" type="date" className="max-w-72"
            {...register("started_date", { required: true })} />
          <InputField
            label="終了日" type="date" className="max-w-72"
            {...register("ended_date", { required: true })} />
          {mutation.isError && (
            <Alert variant="error" message={mutation.error.message} />
          )}
          {mutation.isPending && (
            <Alert variant="default" message="花展を作成中" />
          )}
          <div>
            <Button type="submit" variant="primary">
              作成
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
