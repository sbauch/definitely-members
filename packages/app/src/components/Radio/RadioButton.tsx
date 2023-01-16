import styled from "@emotion/styled";
import { Button, buttonReset } from "~components/Button";
import { ButtonClear } from "~components/ButtonClear";
import { monoStyles } from "~components/Typography";
import { InputElementProps } from "./InputInterface";
import { Label, Radio } from "./InputStyles";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &.For > button {
    border-color: var(--green);
    border: 1px solid;
  }
  &.For > button.active {
    background: var(--green);
    border-color: var(--green);
  }

  &.Against > button {
    border-color: var(--red);
    border: 1px solid;
  }
  
  &.Against > button.active {
    background: var(--red);
    border: 1px solid;
    border-color: var(--red);
  }

  &.Abstain > button {
    border-color: var(--foreground);
    border: 1px solid;
  }
  
  &.Abstain > button.active {
    background: var(--foreground);
    border-color: var(--foreground);
    filter: alpha(opacity=48);
    opacity: 0.48;
  }

`;

const ActiveButton = styled.button`
  ${monoStyles}
  ${buttonReset}
  color: var(--background);
  position: relative;
  border-color: var(--background);
  border-radius: 0.5rem;
  border: 1px solid;
  padding: 1rem 1.5rem;
`;

const InactiveButton = styled.button`
  ${monoStyles}
  ${buttonReset}
  background: var(--background);
  color: var(--foreground);
  position: relative;
  border-radius: 0.5rem;
  border: 1px solid;
  padding: 1rem 1.5rem;
`;


const RadioButton = ({
  label,
  id,
  disabled,
  onChange,
  value,
}: InputElementProps) => {
  return (
    <Wrapper className={label}>
      {label === value ? (
        <Button className="active" type="button">
          <span>{label}</span>
        </Button>
      ) : (
        <InactiveButton className="inactive" id={id} type="button" onClick={() => onChange(label)}>
          <span>{label}</span>
        </InactiveButton>
      )}
    </Wrapper>
  );
};

export default RadioButton;
