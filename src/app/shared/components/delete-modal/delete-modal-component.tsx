import { useEffect, useState } from "react";
import Button from "../button/button-component";
import Modal from "react-bootstrap/Modal";
import "./delete-modal-styles.scss";

import { ITodo } from "../../domain-types";

type Props = {
  show: boolean;
  handleClose: () => void;
  onDeleteTodo: (todo: ITodo) => void;
  todo: ITodo | null;
};

const ModalDelete: React.FC<Props> = ({
  show,
  handleClose,
  onDeleteTodo,
  todo,
}) => {
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <h5>Deseja realmente deletar a tarefa?</h5>
      </Modal.Header>
      <Modal.Body>
        <span>Tem certeza que você deseja deletar essa tarefa?</span>

        <div
          className="buttons-container"
          style={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            marginTop: "16px",
          }}
        >
          <Button
            variant="cancel"
            width={isMobile ? "100%" : "47%"}
            onClick={handleClose}
          >
            Cancelar
          </Button>

          <Button
            onClick={() => todo && onDeleteTodo(todo)}
            width={isMobile ? "100%" : "47%"}
            variant="danger"
          >
            Deletar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalDelete;
