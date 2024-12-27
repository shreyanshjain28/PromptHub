'use client';

import { Suspense } from 'react';
import UpdatePromptComponent from './UpdatePromptComponent';

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UpdatePromptComponent />
    </Suspense>
  );
};

export default UpdatePromptPage;