"use client";

import { useEffect, useState } from "react";
import LogoIcon from "../../assets/lodo";
import styles from "./header-styles.module.scss";

const Header: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("pt-BR", { month: "long" });
    const year = date.getFullYear();

    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${dayOfWeek}, ${day} de ${month} de ${year}`;
  };

  useEffect(() => {
    setCurrentDate(formatDate());
  }, []);

  return (
    <header className={styles.header}>
      <LogoIcon width="150" height="100" />
      <h3>Bem-vindo de volta, Eduardo</h3>
      <span>{currentDate}</span>
    </header>
  );
};

export default Header;
