import {useState, useRef} from 'react';
import {Button} from '@/components/bootstrap';

import {useAppDispatch} from '@/hooks';

import importActions from '@/actions/importActions';

import uiHelper from '@/helpers/uiHelper';

import PageWrapper from '@/components/common/PageWrapper';

import * as styled from './ImportPage.styled';

function ImportPage() {
  const dispatch = useAppDispatch();

  const inputRef = useRef<any>(null);

  const [added, setAdded] = useState<number>(0);
  const [skipped, setSkipped] = useState<number>(0);

  function openFileHandler() {
    if (!inputRef?.current) return;
    inputRef.current.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files[0];
    await importBookmarks(file.path);
  }

  async function importBookmarks(filePath) {
    if (!filePath) return;

    const importResults = await dispatch(importActions.importBookmarks(filePath));

    uiHelper.showMessage('Bookmarks was imported successfully');

    setAdded(importResults.added);
    setSkipped(importResults.skipped);
  }

  function render() {
    const resultsHidden = added === 0 && skipped === 0;

    return (
      <PageWrapper title="Import Bookmarks">
        <fieldset>
          <p>From browser bookmarks - bookmarks will be merged</p>

          <Button onClick={openFileHandler}>Open file</Button>

          <styled.uploadInput type="file" ref={inputRef} accept=".html" onChange={handleFileChange} />
        </fieldset>

        {!resultsHidden && (
          <styled.results>
            <h4>Import results</h4>
            <br />

            <p>Added: {added}</p>
            <p>Skipped: {skipped}</p>
          </styled.results>
        )}
      </PageWrapper>
    );
  }

  return render();
}

export default ImportPage;
