import { useForm, Controller } from "react-hook-form";
import type { UseMutationResult } from "@tanstack/react-query";
import type { components } from "@/types/api";

import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import ChoiceField from "@/components/parts/field/ChoiceField";
import ImageField from "@/components/parts/field/ImageField";
import Alert from "@/components/parts/Alert";

type Work = components["schemas"]["Work"];
type UpdatePayload = components["schemas"]["UpdateWorkPayload"];
type Category = components["schemas"]["Category"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Arranger = components["schemas"]["Arranger"];

type Props = {
  work: Work;
  categories: Category[];
  materials: Material[];
  seasons: Season[];
  arrangers: Arranger[];
  mutation: UseMutationResult<void, Error, UpdatePayload, unknown>;
};

export default function UpdateWorkForm({
  work,
  categories,
  materials,
  seasons,
  arrangers,
  mutation,
}: Props) {
  console.log({
      title: work.title ?? "",
      arranger_id: work.arranger_id,
      category_id: work.category_id,
      material_ids: work.material_ids ?? [],
      season_id: work.season_id,
      image_ids: work.image_ids ?? [],
    })

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UpdatePayload>({
    defaultValues: {
      title: work.title ?? "",
      arranger_id: work.arranger_id,
      category_id: work.category_id,
      material_ids: work.material_ids ?? [],
      season_id: work.season_id,
      image_ids: work.image_ids ?? [],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutateAsync(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
      <InputField
        label="タイトル"
        type="text"
        className="max-w-72"
        {...register("title")}
        error={errors.title}
      />

      <Controller
        name="category_id"
        control={control}
        render={({ field }) => (
          <ChoiceField
            label="作品分類"
            name={field.name}
            type="radio"
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.category_id}
          />
        )}
      />

      <Controller
        name="material_ids"
        control={control}
        render={({ field }) => (
          <ChoiceField
            label="使用材料"
            name={field.name}
            type="checkbox"
            options={materials.map((m) => ({ label: m.name, value: m.id }))}
            value={field.value}
            onChange={field.onChange} />
        )}
      />

      <Controller
        name="season_id"
        control={control}
        render={({ field }) => (
          <ChoiceField
            label="季節"
            name={field.name}
            type="radio"
            options={seasons.map((s) => ({ label: s.name, value: s.id }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.season_id}
          />
        )}
      />

      <Controller
        name="arranger_id"
        control={control}
        render={({ field }) => (
          <ChoiceField
            label="作者"
            name={field.name}
            type="radio"
            options={arrangers.map((a) => ({ label: a.name, value: a.id }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.arranger_id}
          />
        )}
      />

      <ImageField
        name="image_ids"
        label="作品画像"
        control={control}
      />

      {mutation.isError && (
        <Alert variant="error" message={mutation.error.message || "作品の更新に失敗しました"} />
      )}

      {mutation.isSuccess && (
        <Alert variant="success" message="作品を更新しました" />
      )}

      <div>
        <Button type="submit" variant="primary">
          更新
        </Button>
      </div>
    </form>
  );
}
