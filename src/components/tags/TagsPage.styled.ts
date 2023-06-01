import styled, {css} from 'styled-components';

import {colors} from '@/styles/shared';

export type tagField = 'title' | 'bookmarkCount' | 'description' | 'tools';

export const wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 60px;
`;

export const header = styled.div`
  text-align: center;
  height: 60px;
`;

export const tableHeader = styled.div`
  padding-right: 40px;
  font-size: 16px;
  font-weight: bold;
`;

export const tableBody = styled.div`
  position: absolute;
  top: 110px;
  bottom: 0;
  padding-right: 20px;
  padding-bottom: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const tableRow = styled.div`
  border-bottom: 1px solid ${colors.gray};
`;

export const tableCell = styled.div<{field: tagField}>`
  display: table-cell;
  padding: 8px;

  ${props =>
    props.field === 'title' &&
    css`
      min-width: 500px;
    `}

  ${props =>
    props.field === 'bookmarkCount' &&
    css`
      min-width: 300px;
    `}

  ${props =>
    props.field === 'description' &&
    css`
      min-width: 500px;
      width: 100%;
    `}

    ${props =>
    props.field === 'tools' &&
    css`
      min-width: 100px;
    `}
`;

export const sortContainer = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;

  & button {
    color: initial;
  }
`;

export const noTagsMessage = styled.div`
  font-size: 16px;
`;
