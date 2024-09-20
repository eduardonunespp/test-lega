import styles from "./button-styles.module.scss";
import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  width?: string;
  variant?: string;
  onClick?: () => void;
  children?: ReactNode;
  isDisabled?: boolean;
};

const Button: React.FC<Props> = ({
  width,
  variant,
  onClick,
  children,
  isDisabled,
}) => {
  const getBackground = () => {
    switch (variant) {
      case "danger":
        return "linear-gradient(to right, #D30707, #F05353)";
      case "cancel":
        return "rgba(231, 238, 251, 1)";
      default:
        return "linear-gradient(to right, #0796d3, #53c0f0)";
    }
  };

  return (
    <button
      disabled={isDisabled}
      className={classNames(styles.button, { [styles.disabled]: isDisabled })}
      style={{
        width: width || "100%",
        color: variant === "cancel" ? "#000" : "#fff",
        background: getBackground(),
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
