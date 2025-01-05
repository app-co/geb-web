import { ZodError } from "zod";
import { useToast } from "../context/ToastContext";
import { AppError } from "./AppError";

export function showMessage(error: any) {
  const { addToast } = useToast()
  if (error instanceof AppError) {
    return addToast({
      title: 'Ops!',
      description: error.message,
      type: 'info',
    })
  }

  if (error instanceof ZodError) {
    return addToast({
      title: 'Ops!',
      description: error.message,
      type: 'info',
    })
  }

  return addToast({
    title: 'Error!',
    description: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
    type: 'error',
  })
}