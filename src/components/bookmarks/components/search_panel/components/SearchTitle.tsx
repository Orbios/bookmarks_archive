import * as styled from './SearchTitle.styled';

interface Props {
  title: string;
}

function SearchTitle({title}: Props) {
  return (
    <styled.container>
      <h4>{title}</h4>
    </styled.container>
  );
}

export default SearchTitle;
