"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
    
    //creating and deproting router 
    //session to get email data 
    
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);      // to be used as loader
    
        try {
          const response = await fetch("/api/prompt/new", {
            method: "POST",
            body: JSON.stringify({
              prompt: post.prompt,
              userId: session?.user.id,
              tag: post.tag,
            }),
          });

          if (response.ok) {
            router.push("/");       // to home page
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      };

    return(
        <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
    )
  
}

export default CreatePrompt