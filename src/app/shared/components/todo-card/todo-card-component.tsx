import TrashIcon from "../../assets/trash";

import Form from "react-bootstrap/Form";

import "./todo-card-styles.scss"

type Props = {
  text: string;
  isConcluded: boolean;
  openDeleteModal: () => void;
  onToggleConcluded: (id: number) => void;
  id: number;
};

const TodoCard: React.FC<Props> = ({
  text,
  isConcluded,
  openDeleteModal,
  onToggleConcluded,
  id,
}) => {
  return (
    <div className='card-custom'>
      <div className='custom'>
        <Form.Check
          type="checkbox"
          id={`custom-checkbox-${id}`}
          checked={isConcluded}
          onChange={() => onToggleConcluded(id)}
        />

        <span className={isConcluded ? 'strikethrough' : ''}>{text.length > 25 ? `${text.slice(0, 25)}...` : text}</span>
      </div>

      <button onClick={openDeleteModal}>
        <TrashIcon width="20px" height="20px" />
      </button>
    </div>
  );
};

export default TodoCard;
