import Select from 'react-select';

import * as styled from './TagSelector.styled';

interface Props {
  label: string;
  multi: boolean;
  options: TagOption[];
  value: TagOption[];
  onChange: (value: number[]) => void;
  error?: string;
}

function TagSelector({label, multi, options, value, onChange, error}: Props) {
  function inputOnChange(val: any) {
    const value: number[] = val.map(x => x.value);

    onChange(value);
  }

  return (
    <styled.wrapper>
      <styled.label htmlFor="tags">{label}</styled.label>

      <Select name="tags" isMulti={multi} options={options as any} value={value} onChange={inputOnChange} />
    </styled.wrapper>
  );
}

export default TagSelector;
