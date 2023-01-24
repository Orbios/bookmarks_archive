import styled from 'styled-components';

const activeColor = '#c7bcc6';

export const wrapper = styled.div<{active: boolean}>`
  margin-top: 10px;
  color: ${props => props.active && activeColor};
`;

export const title = styled.span`
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  margin-left: 7px;
`;

export const contentContainer = styled.div`
  border: 1px solid ${activeColor};
  margin-right: 15px;
  margin-top: 5px;
  padding: 5px;
`;
