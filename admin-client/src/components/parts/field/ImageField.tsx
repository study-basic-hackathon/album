import { buildImageUrl } from "@/api/image";
import { useUploadImageMutation } from "@/hooks/image";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import LabelButton from "../Button/LabelButton";
import FormField from ".";

type Props = {
  name: string;
  label: string;
  control: any
};

export default function ImageField({ name, label, control }: Props) {
  const uploadMutation = useUploadImageMutation();
  const [uploading, setUploading] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const [previewIds, setPreviewIds] = useState<string[]>(
          field.value ?? []
        );

        useEffect(() => {
          setPreviewIds(field.value ?? []);
        }, [field.value]);

        const handleFileChange = async (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const files = Array.from(e.target.files ?? []);
          if (files.length === 0) return;

          setUploading(true);
          const newIds: number[] = [];

          for (const file of files) {
            try {
              const id = await uploadMutation.mutateAsync(file);
              newIds.push(+id);
            } catch (error) {
              console.error("アップロード失敗:", error);
            }
          }

          const updated = [...(field.value ?? []), ...newIds];
          field.onChange(updated);
          setPreviewIds(updated);

          setUploading(false);
          e.target.value = "";
        };

        const handleRemove = (id: string) => {
          const updated = previewIds.filter((x) => x !== id);
          field.onChange(updated);
          setPreviewIds(updated);
        };

        const inputId = `image-field-${name}`;

        return (
          <FormField label={label} error={fieldState.error}>

            <div>
              <LabelButton variant="secondary" htmlFor={inputId}>ファイルを選択する</LabelButton>
              <input
                hidden
                id={inputId}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
              />
            </div>

            {uploading && (
              <span className="text-sm text-gray-500">アップロード中...</span>
            )}

            <div className="flex gap-2 flex-wrap mt-2">
              {previewIds.map((id) => (
                <div key={id} className="relative">
                  <img
                    src={buildImageUrl(Number(id))}
                    alt="uploaded"
                    className="w-24 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemove(id)}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </FormField>
        );
      }}
    />
  );
}
