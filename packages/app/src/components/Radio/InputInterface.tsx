import { InputHTMLAttributes } from "react";

export interface IOption {
  label: string;
  name?: string;

  disabled?: boolean;
}

export interface IInputGroup {
  options: IOption[];
  hasFullWidth?: boolean;
  onChange: (value: string) => void;
  value: string;
}

export interface InputElementProps {
  label: string;
  id: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
}
