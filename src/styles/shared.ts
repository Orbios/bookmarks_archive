import {css} from 'styled-components';

export const colors = {
  green: '#3a891e',
  greenLight: '#8cd31e',
  gold: 'darkgoldenrod',
  red: '#a71515',
  gray: '#e5e5e5',
  white: '#FFFFFF',
  black: '#000000'
};

export const sideNavWidth = '70px';

export const searchPanelWidth = '280px';

export const actionListContainer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    padding: 0;
    margin: 0 6px;
  }
`;
