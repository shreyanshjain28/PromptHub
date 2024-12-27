'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Form from '@components/Form';

const UpdatePromptComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptId = searchParams?.get('id');
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchPromptDetails = async () => {
      if (!promptId) return;

      try {
        const res = await fetch(`/api/prompt/${promptId}`);
        if (!res.ok) throw new Error('Failed to fetch prompt details');

        const data = await res.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromptDetails();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error('Failed to update prompt');
      router.push('/');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!promptId) return <p>Error: Missing Prompt ID</p>;

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default UpdatePromptComponent;