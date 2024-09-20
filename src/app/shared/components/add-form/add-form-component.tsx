"use client";

import { SubmitHandler, useFormContext } from "react-hook-form";
import Button from "../button/button-component";
import { useEffect, useState } from "react";
import "./add-form-styles.scss";
import { Form } from "react-bootstrap";

type IAddTodo = {
  description: string;
};

type Props = {
  onSubmit: SubmitHandler<IAddTodo>;
  handleCloseModal: () => void;
};

const AddTodoForm: React.FC<Props> = ({ onSubmit, handleCloseModal }) => {
  const { register, formState, handleSubmit } = useFormContext<IAddTodo>();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Título:</label>

      <Form.Control
        type="text"
        placeholder="Digite:"
        {...register("description")}
        isInvalid={!!formState.errors.description}
      />

      <Form.Control.Feedback type="invalid">
        {formState.errors.description?.message}
      </Form.Control.Feedback>

      <div
        className="footer-form"
        style={{
          display: "flex",
          flexDirection: isMobile ? "column-reverse" : "row",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <Button
          variant="cancel"
          width={isMobile ? "100%" : "47%"}
          onClick={handleCloseModal}
        >
          Cancelar
        </Button>

        <Button
          isDisabled={!formState.isValid}
          width={isMobile ? "100%" : "47%"}
        >
          Adicionar
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
