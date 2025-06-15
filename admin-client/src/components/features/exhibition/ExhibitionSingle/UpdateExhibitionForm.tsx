import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import type { components } from '@/types/api';

import {
  getExhibition,
  updateExhibition,
} from '@/api/exhibition'

import InputField from '@/components/parts/field/InputField';
import Button from '@/components/parts/Button';
import type { ApiResult } from '@/types/ui';
import type { UseMutationResult } from '@tanstack/react-query';

type UpdateExhibitionPayload = components['schemas']['UpdateExhibitionPayload'];
type FormValues = Parameters<typeof updateExhibition>[1];
type UpdateExhibitionMutation = UseMutationResult<
  void,
  unknown,
  UpdateExhibitionPayload,
  unknown
>;

export default function UpdateExhibitionForm({
  exhibition,
  mutation,
}: {
  exhibition: ApiResult<typeof getExhibition>;
  mutation: UpdateExhibitionMutation;
}) {
  const { handleSubmit, register } = useForm<FormValues>({
    defaultValues: {
      name: exhibition.name || "",
      started_date: format(exhibition ? new Date(exhibition.started_date) : new Date(), "yyyy-MM-dd"),
      ended_date: format(exhibition ? new Date(exhibition.ended_date) : new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutation.mutateAsync(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4">
      <InputField
        label="花展名" type="text" className="max-w-72"
        {...register("name", { required: true })} />
      <InputField
        label="開始日" type="date" className="max-w-72"
        {...register("started_date", { required: true })} />
      <InputField
        label="終了日" type="date" className="max-w-72"
        {...register("ended_date", { required: true })} />
      <div>
        <Button type="submit" variant="primary">
          保存
        </Button>
      </div>
    </form>
  );
}
