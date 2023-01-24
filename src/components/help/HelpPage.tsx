import ReactMarkdown from 'react-markdown';

import PageWrapper from '@/components/common/PageWrapper/PageWrapper.js';

import helpContent from './help.md.js';

function HelpPage() {
  return (
    <PageWrapper title="Bookmarks Archive">
      <ReactMarkdown children={helpContent} />
    </PageWrapper>
  );
}

export default HelpPage;
