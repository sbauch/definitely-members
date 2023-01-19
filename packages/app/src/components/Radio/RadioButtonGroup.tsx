import styled from "@emotion/styled";
import { Legend } from "./InputStyles";
import { IInputGroup, IOption } from "./InputInterface";
import RadioButton from "./RadioButton";

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

const Wrapper = styled.div`
  padding: 0.5rem 0rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const RadioButtonGroup = ({ options, onChange, value, disabled }: IInputGroup) => {
  function renderOptions() {
    return options.map(({ label, name, disabled }: IOption, index) => {
      const shortenedOptionLabel = label.replace(/\s+/g, "");
      const optionId = `radio-option-${shortenedOptionLabel}`;

      return (
        <RadioButton
          label={label}
          key={optionId}
          id={optionId}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
      );
    });
  }
  return (
    <Fieldset>
      <Wrapper>{renderOptions()}</Wrapper>
    </Fieldset>
  );
};
export default RadioButtonGroup;
