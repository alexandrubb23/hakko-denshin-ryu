import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type {
  Control,
  DefaultValues,
  FieldErrors,
  FieldValues,
  Resolver,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { useForm } from "react-hook-form";

import type { RankFormBase } from "@hakko/core";

interface Options<T extends RankFormBase> {
  resolver: Resolver<T>;
  getDefaultValues: () => T;
  open: boolean;
  extraResetDeps?: readonly unknown[];
  onReset?: () => void;
}

export interface RankFormResult<T extends RankFormBase> {
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<T>;
  errors: FieldErrors<T>;
  isDirty: boolean;
}

function useRankForm<T extends RankFormBase>({
  resolver,
  getDefaultValues,
  open,
  extraResetDeps = [],
  onReset,
}: Options<T>): RankFormResult<T> {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<T>({
    resolver,
    defaultValues: getDefaultValues() as DefaultValues<T>,
  });

  useEffect(() => {
    if (!open) return;
    reset(getDefaultValues() as DefaultValues<T>);
    onReset?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, ...extraResetDeps]);

  return {
    control: control as unknown as Control<FieldValues>,
    register: register as unknown as UseFormRegister<FieldValues>,
    handleSubmit,
    errors,
    isDirty,
  };
}

export { zodResolver };
export default useRankForm;
