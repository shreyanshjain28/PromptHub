'use client';      //as we using browser compatabilty 

import { SessionProvider } from "next-auth/react";


//Higher order Component Provider 
const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;