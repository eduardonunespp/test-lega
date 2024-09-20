import * as yup from "yup";

export const TodoValidator = yup.object({
  description: yup.string().required("O título da tarefa é obrigatório"),
});
