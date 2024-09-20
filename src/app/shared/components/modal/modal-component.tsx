import Modal from "react-bootstrap/Modal";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import AddTodoForm from "../add-form/add-form-component";
import { ITodo } from "../../domain-types";
import "./modal-styles.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { TodoValidator } from "../../validators";

type Props = {
  show: boolean;
  handleClose: () => void;
  addTodo: (todo: ITodo) => void;
};

type IAddTodo = {
  description: string;
};

const ModalEdit: React.FC<Props> = ({ show, handleClose, addTodo }) => {
  const form = useForm<IAddTodo>({
    mode: "onChange",
    resolver: yupResolver(TodoValidator),
  });

  const onSubmit: SubmitHandler<IAddTodo> = (data) => {
    const todo: ITodo = {
      isConcluded: false,
      id: Date.now(),
      text: data.description,
    };

    addTodo(todo);

    form.reset();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <h5>Nova Tarefa</h5>
        </Modal.Header>
        <Modal.Body>
          <FormProvider {...form}>
            <AddTodoForm onSubmit={onSubmit} handleCloseModal={handleClose} />
          </FormProvider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEdit;
