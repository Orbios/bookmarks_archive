import {Link} from 'react-router-dom';

import AppIcon, {IconName} from '@/components/common/AppIcon';

import * as styled from './Navigation.styled';

interface CustomLink {
  url: string;
  icon: IconName;
}

const links: CustomLink[] = [
  {url: '/', icon: 'home'},
  {url: '/tags', icon: 'tags'},
  {url: '/import', icon: 'download'},
  {url: '/preferences', icon: 'preferences'},
  {url: '/help', icon: 'help'}
];

function Navigation() {
  return (
    <styled.wrapper>
      <styled.container>
        {links.map(link => {
          const url = link.url;

          return (
            <styled.item key={url}>
              <Link to={url}>
                <styled.action variant="link" className="nav">
                  <AppIcon icon={link.icon} size="xs" />
                </styled.action>
              </Link>
            </styled.item>
          );
        })}
      </styled.container>
    </styled.wrapper>
  );
}

export default Navigation;
