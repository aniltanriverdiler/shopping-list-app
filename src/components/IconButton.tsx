import type { ReactNode } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

const StyledButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: all 0.3s ease;
  padding: 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    transform: scale(0);
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scale(1);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &.btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    
    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    }
  }

  &.btn-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    
    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
    }
  }

  &.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    
    &:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    }
  }

  &.btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    
    &:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    }
  }

  svg {
    font-size: 0.9rem;
    z-index: 1;
  }
`;

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
    <StyledButton 
      variant={variant} 
      size={size} 
      onClick={onClick} 
      title={title}
    >
      {icon}
    </StyledButton>
  );
};

export default IconButton;