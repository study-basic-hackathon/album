import { useForm, Controller } from "react-hook-form";
import type { components } from "@/types/api";

import InputField from "@/components/parts/field/InputField";
import Button from "@/components/parts/Button";
import ChoiceField from "@/components/parts/field/ChoiceField";
import type { UseMutationResult } from "@tanstack/react-query";
import ImageField from "@/components/parts/field/ImageField";

type Exhibition = components["schemas"]["Exhibition"];
type Category = components["schemas"]["Category"];
type Material = components["schemas"]["Material"];
type Season = components["schemas"]["Season"];
type Arranger = components["schemas"]["Arranger"];

type FormValues = components["schemas"]["CreateWorkPayload"];

type CreateWorkMutationResult = UseMutationResult<
  unknown,
  unknown,
  components["schemas"]["CreateWorkPayload"],
  unknown
>;

export default function CreateExhibitionWorkForm({
  mutation,
  exhibition,
  categories,
  materials,
  seasons,
  arrangers,
}: {
  mutation: CreateWorkMutationResult;
  exhibition: Exhibition;
  categories: Category[];
  materials: Material[];
  seasons: Season[];
  arrangers: Arranger[];
}) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      exhibition_id: exhibition.id,
      arranger_id: arrangers[0]?.id || 0,
      category_id: categories[0]?.id || 0,
      material_ids: [],
      season_id: seasons[0]?.id || 0,
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
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
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
            options={materials.map((material) => ({
              label: material.name,
              value: material.id,
            }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.material_ids && errors.material_ids[0]}
          />
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
            options={seasons.map((season) => ({
              label: season.name,
              value: season.id,
            }))}
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
            options={arrangers.map((arranger) => ({
              label: arranger.name,
              value: arranger.id,
            }))}
            value={field.value}
            onChange={field.onChange}
            error={errors.arranger_id}
          />
        )}
      />

      <ImageField
        name="image_ids" label="作品画像"
        control={control} />

      <div>
        <Button type="submit" variant="primary">
          保存
        </Button>
      </div>
    </form>
  );
}
