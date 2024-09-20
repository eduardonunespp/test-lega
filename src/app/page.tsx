"use client";

import { useEffect, useState } from "react";
import styles from "./home.module.scss";
import {
  Button,
  Header,
  AddModal,
  TodoCard,
  DeleteModal,
} from "./shared/components";
import { ITodo } from "./shared/domain-types";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<ITodo | null>(null);

  const onAddTodos = (todo: ITodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, todo];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setShowEditModal(false);
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const onOpenEditModal = () => {
    setShowEditModal(true);
  };

  const onCloseEditModal = () => {
    setShowEditModal(false);
  };

  const onOpenDeleteModal = (todo: ITodo) => {
    setShowDeleteModal(true);

    setTodoToDelete(todo);
  };

  const onCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const onToggleConcluded = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isConcluded: !todo.isConcluded } : todo
      );

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });
  };

  const onDeleteTodo = (todo: ITodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((t) => t.id !== todo.id);

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    });

    onCloseDeleteModal();
  };

  return (
    <>
      <main className={styles.main}>
        <Header />
        <section>
          <div className={styles.todoContainerP}>
            <div className={styles.todoContainerF}>
              {todos.length > 0 ? (
                todos.map((todo) => {
                  return (
                    <TodoCard
                      id={todo.id}
                      isConcluded={todo.isConcluded}
                      text={todo.text}
                      key={todo.id}
                      openDeleteModal={() => onOpenDeleteModal(todo)}
                      onToggleConcluded={onToggleConcluded}
                    />
                  );
                })
              ) : (
                <div className={styles.containerMessage}>
                  <span>SEM TAREFAS NO MOMENTO</span>
                </div>
              )}
            </div>

            <Button onClick={onOpenEditModal}>Adicionar Nova Tarefa</Button>
          </div>
        </section>
        <AddModal
          handleClose={onCloseEditModal}
          show={showEditModal}
          addTodo={onAddTodos}
        />

        <DeleteModal
          handleClose={onCloseDeleteModal}
          show={showDeleteModal}
          todo={todoToDelete}
          onDeleteTodo={onDeleteTodo}
        />
      </main>
    </>
  );
};

export default Home;
