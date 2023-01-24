import BookmarksPage from '@/components/bookmarks/BookmarksPage';
import TagsPage from '@/components/tags/TagsPage';
import ImportPage from '@/components/import/ImportPage';
import PreferencesPage from '@/components/preferences/PreferencesPage';
import HelpPage from '@/components/help/HelpPage';
import NotFountPage from '@/components/NotFoundPage';

export const routes = [
  {
    path: '/',
    component: BookmarksPage,
    pageProps: {
      pageId: 'bookmarks',
      title: 'Bookmarks'
    }
  },
  {
    path: '/tags',
    component: TagsPage,
    pageProps: {
      pageId: 'tags',
      title: 'Tags'
    }
  },
  {
    path: '/import',
    component: ImportPage,
    pageProps: {
      pageId: 'import',
      title: 'Import'
    }
  },
  {
    path: '/preferences',
    component: PreferencesPage,
    pageProps: {
      pageId: 'preferences',
      title: 'Preferences'
    }
  },
  {
    path: '/help',
    component: HelpPage,
    pageProps: {
      pageId: 'help',
      title: 'Help'
    }
  },
  {
    path: '/*',
    component: NotFountPage,
    pageProps: {
      pageId: 'not_found',
      title: 'Page not found',
      public: true
    }
  }
];
