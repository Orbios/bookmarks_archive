import styled, {css} from 'styled-components';

import {searchPanelWidth, colors} from '@/styles/shared';

type fieldType = 'checkbox' | 'title' | 'url' | 'tags' | 'tools' | 'info';

export const wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: ${searchPanelWidth};
`;

export const headerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 14px 0;
`;

export const sortOrderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const tableHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  padding-right: 40px;
`;

export const tableBody = styled.div`
  position: absolute;
  overflow-y: scroll;
  bottom: 0;
  top: 120px;
  padding-right: 20px;
  padding-bottom: 20px;
`;

export const row = styled.div`
  border-bottom: 1px solid ${colors.gray};
`;

export const cell = styled.div<{field: fieldType}>`
  display: table-cell;
  padding: 5px;
  vertical-align: top;

  ${props =>
    props.field === 'checkbox' &&
    css`
      min-width: 50px;
      padding-left: 40px;
      input {
        margin-top: 5px;
      }
    `}

  ${props =>
    props.field === 'title' &&
    css`
      width: 100%;
      min-width: 350px;
      label {
        cursor: pointer;
      }
    `}

  ${props =>
    props.field === 'url' &&
    css`
      min-width: 450px;
      button {
        font-size: 14px;
      }
    `}

  ${props =>
    props.field === 'tags' &&
    css`
      min-width: 60px;
    `}

  ${props =>
    props.field === 'tools' &&
    css`
      min-width: 60px;
    `}

  ${props =>
    props.field === 'info' &&
    css`
      min-width: 30px;
    `}
`;

export const sortDirectionIconContainer = styled.div`
  margin-left: 8px;
`;

export const noBookmarks = styled.div`
  font-size: 16px;
  padding: 40px;
`;

export const addBookmarkContainer = styled.div`
  text-align: center;
  margin-top: 12px;
`;
