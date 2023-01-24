import {useAppSelector} from '@/hooks';

import SearchTitle from './components/SearchTitle';

import * as styled from './BookmarkStatistics.styled';

function BookmarkStatistics() {
  const totalBookmarksCount = useAppSelector(state => state.statistics.totalBookmarksCount);
  const taggedBookmarksCount = useAppSelector(state => state.statistics.taggedBookmarksCount);
  const deletedBookmarksCount = useAppSelector(state => state.statistics.deletedBookmarksCount);

  return (
    <div>
      <SearchTitle title="Statistics" />

      <styled.statisticsRow>
        All bookmarks: <styled.statisticsValue>{totalBookmarksCount}</styled.statisticsValue>
      </styled.statisticsRow>
      <styled.statisticsRow>
        Tagged bookmarks: <styled.statisticsValue>{taggedBookmarksCount}</styled.statisticsValue>
      </styled.statisticsRow>
      <styled.statisticsRow>
        Deleted bookmarks: <styled.statisticsValue>{deletedBookmarksCount}</styled.statisticsValue>
      </styled.statisticsRow>
    </div>
  );
}

export default BookmarkStatistics;
