import Helmet from 'react-helmet';
import styled from 'styled-components';

import Navigation from './Navigation';

import {sideNavWidth} from '@/styles/shared';

const Wrapper = styled.div`
  min-width: 800px;
  height: 100%;
`;

const Main = styled.div`
  min-width: 500px;
  position: absolute;
  left: ${sideNavWidth};
  top: 0;
  bottom: 0;
  right: 0;
`;

interface Props {
  title: string;
  children?: any;
}

function AppPage(props: Props) {
  function getTitle() {
    return props.title ? `Bookmarks Archive - ${props.title}` : 'Bookmarks Archive';
  }

  function render() {
    const title = getTitle();

    return (
      <Wrapper>
        <Helmet title={title} />

        <Navigation />

        <Main>{props.children}</Main>
      </Wrapper>
    );
  }

  return render();
}

export default AppPage;
