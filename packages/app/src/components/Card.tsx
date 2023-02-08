import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LoadingIndicator } from "./LoadingIndicator";
import { Subheading } from "./Typography";

const StyledCard = styled.article<{ isLoading: boolean }>`
  border: 1px solid rgba(var(--foreground-alpha), 0.05);
  padding: 1rem;
  border-radius: 0.5rem;

  @media (min-width: 32rem) {
    padding: 2rem;
    border-radius: 1rem;
  }

  .subhead {
    display: grid;
    grid-template-columns: 1fr 240px;
    align-items: baseline;
    justify-content: space-between;
  }

  ${(p) =>
    p.isLoading &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      @media (min-width: 32rem) {
        padding: 4rem;
      }
    `}
`;

type Props = {
  children?: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  addendum?: React.ReactNode;
};

export function Card({ children, title, isLoading = false, addendum }: Props) {
  return (
    <StyledCard isLoading={isLoading}>
      {!isLoading && (
        <Subheading margin="0 0 0.25">
          <div className="subhead">
            <div>{title}</div>
            {addendum}
          </div>
        </Subheading>
      )}
      {isLoading && <LoadingIndicator />}
      {children}
    </StyledCard>
  );
}
