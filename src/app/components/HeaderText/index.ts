import styled from 'styled-components';

type SubHeaderTextColorProps = {
  up?: boolean;
};

type SubHeaderTextProps = {
  hover?: boolean;
};

export const HeaderText = styled.p`
  color: ${p => p.theme.textSecondary};
  font-weight: 500;
  font-size: 1.25rem;
  margin: 0;
`;

export const SubHeaderText = styled.p<SubHeaderTextProps>`
  color: ${p => p.theme.textSecondary};
  font-weight: 500;
  font-size: 1rem;
  margin: 0;

  &.active {
    color: ${p => p.theme.text};
  }

  &:hover {
    cursor: ${({ hover }) => (hover ? 'pointer' : 'unset')};
  }
`;

export const SubHeaderTextColor = styled.p<SubHeaderTextColorProps>`
  color: ${({ up }) => (up ? p => p.theme.text : '#fc0303')};
  font-weight: 500;
  font-size: 1rem;
  margin: 0;
`;
