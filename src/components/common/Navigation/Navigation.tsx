import {Link} from 'react-router-dom';

import AppIcon, {IconName} from '@/components/common/AppIcon';
import Tooltip from '@/components/common/Tooltip';

import * as styled from './Navigation.styled';

interface CustomLink {
  url: string;
  icon: IconName;
  tooltip: string;
}

const links: CustomLink[] = [
  {url: '/', icon: 'home', tooltip: 'Bookmarks'},
  {url: '/tags', icon: 'tags', tooltip: 'Tags'},
  {url: '/import', icon: 'download', tooltip: 'Import'},
  {url: '/preferences', icon: 'preferences', tooltip: 'Preferences'},
  {url: '/help', icon: 'help', tooltip: 'Help'}
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
                  <Tooltip id={`nav-${link.icon}`} title={link.tooltip} placement="right">
                    <AppIcon icon={link.icon} size="xs" />
                  </Tooltip>
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
