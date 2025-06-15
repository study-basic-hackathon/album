import Breadcrumb from "@/components/parts/Breadcrumb";
import { useForm } from "react-hook-form";
import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import Card from "@/components/parts/Card";
import Alert from "@/components/parts/Alert";
import { useNavigate } from "react-router";
import { useCreateSeasonMutation } from "@/hooks/season"; // ← 必要に応じて作成

type FormValues = {
  name: string;
};

export default function NewSeason() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const mutation = useCreateSeasonMutation();

  const onSubmit = handleSubmit(async (data) => {
    const id = await mutation.mutateAsync(data);
    navigate(`/seasons/${id}`);
  });

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "季節", to: "/seasons" },
            { label: "季節の作成", to: "/seasons/new" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">季節の作成</h1>
      </div>
      <Card>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
          <InputField
            label="季節名"
            type="text"
            className="max-w-72"
            autoFocus
            {...register("name", { required: true })}
          />
          {mutation.isError && (
            <Alert variant="error" message={mutation.error.message} />
          )}
          {mutation.isPending && (
            <Alert variant="default" message="季節を作成中…" />
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
