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
  font-size: 1.2rem;
  margin: 0;
`;

export const SubHeaderText = styled.p<SubHeaderTextProps>`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${p => p.theme.textSecondary};
  font-weight: 500;
  font-size: 0.95rem;
  margin: 0;

  &.active {
    color: ${p => p.theme.text};
  }

  &:hover {
    cursor: ${({ hover }) => (hover ? 'pointer' : 'unset')};
  }
`;

export const SubHeaderTextColor = styled.p<SubHeaderTextColorProps>`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ up }) =>
    up
      ? p =>
          p.theme.text.replace(
            /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
            'rgba$1,1.2)',
          )
      : '#fc0303'};
  font-weight: 500;
  font-size: 0.95rem;
  margin: 0;
`;
