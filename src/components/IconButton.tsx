import type { ReactNode } from "react";
import { Button } from "react-bootstrap";

type IconButtonProps = {
  icon: ReactNode;
  onClick: () => void;
  variant?: string;
  size?: "sm" | "lg";
  title?: string;
};

const IconButton = ({
  icon,
  onClick,
  variant = "primary",
  size = "sm",
  title,
}: IconButtonProps) => {
  return (
    <Button variant={variant} size={size} onClick={onClick} title={title}>
      {icon}
    </Button>
  );
};

export default IconButton;
