import Breadcrumb from "@/components/parts/Breadcrumb";
import { useForm } from "react-hook-form";
import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import Card from "@/components/parts/Card";
import Alert from "@/components/parts/Alert";
import { useNavigate } from "react-router";
import { useCreateMaterialMutation } from "@/hooks/material"; // ← 必要に応じて作成

type FormValues = {
  name: string;
};

export default function NewMaterial() {
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });

  const mutation = useCreateMaterialMutation();

  const onSubmit = handleSubmit(async (data) => {
    const id = await mutation.mutateAsync(data);
    navigate(`/materials/${id}`);
  });

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "ホーム", to: "/" },
            { label: "花材", to: "/materials" },
            { label: "花材の作成", to: "/materials/new" },
          ]}
        />
      </div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="text-xl font-bold">花材の作成</h1>
      </div>
      <Card>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
          <InputField
            label="花材名"
            type="text"
            className="max-w-72"
            autoFocus
            {...register("name", { required: true })}
          />
          {mutation.isError && (
            <Alert variant="error" message={mutation.error.message} />
          )}
          {mutation.isPending && (
            <Alert variant="default" message="花材を作成中…" />
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
