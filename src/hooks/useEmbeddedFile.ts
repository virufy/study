import { useState, useEffect } from 'react';
import createDOMPurify from 'dompurify';

const DOMPurify = createDOMPurify(window);

const useEmbeddedFile = (filePath = '') => {
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [file, setFile] = useState('');

  useEffect(() => {
    setIsLoadingFile(true);
    fetch(filePath, { mode: 'no-cors' }).then(fetchedFile => fetchedFile.text()).then(result => { setIsLoadingFile(false); setFile(result); });
  }, [filePath]);

  return { file: DOMPurify.sanitize(file, { ADD_ATTR: ['target'] }), isLoadingFile };
};

export default useEmbeddedFile;
