import styled from "@emotion/styled";

export enum BrandColor {
  WHITE = "#FFF",
  PURPLE = "#CDC3DE",
  DARK_PURPLE_FADED = "#7B6798",
  DARK_PURPLE = "#503374",
  YELLOW = "#FFBF44",
}

export const Label = styled.label<{ disabled?: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  color: ${BrandColor.DARK_PURPLE};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
    color: ${BrandColor.DARK_PURPLE_FADED} !important;
  `}
`;

export const Legend = styled.legend`
  font-weight: 600;
  font-size: 1rem;
  color: ${BrandColor.DARK_PURPLE};
  font-family: StabilGrotesk, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
`;

export const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 1.5em;
  height: 1.5em;
  border: 2px solid ${BrandColor.DARK_PURPLE};
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 0.75em;
    height: 0.75em;
    margin: 3px;
  }
  :checked {
    ::after {
      background-color: ${BrandColor.DARK_PURPLE};
    }
    :hover {
      background-color: ${BrandColor.WHITE};
      border: 2px solid ${BrandColor.DARK_PURPLE};
      ::after {
        background-color: ${BrandColor.DARK_PURPLE};
      }
    }
  }
  :focus {
    outline: 2px solid ${BrandColor.YELLOW};
  }
  :hover {
    ::after {
      background-color: ${BrandColor.DARK_PURPLE_FADED};
    }
  }
  :disabled {
    cursor: not-allowed;
    border: 2px solid ${BrandColor.DARK_PURPLE_FADED};
    background-color: ${BrandColor.PURPLE};
    :hover {
      ::after {
        background-color: ${BrandColor.PURPLE};
      }
    }
    :checked {
      ::after {
        background-color: ${BrandColor.DARK_PURPLE_FADED};
      }
      :hover {
        background-color: ${BrandColor.PURPLE};
        ::after {
          background-color: ${BrandColor.DARK_PURPLE_FADED};
        }
      }
    }
  }
`;
