"use client"
import { ResponseType } from '@/types/enums';
import { applicationErrors } from '@/types/errors';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'
import { z } from 'zod';
import { checkError } from './errorChecker';
import Alert from '@/components/Alert';


const TanstackQueryProvider = ({children} : {
    children: React.ReactNode
}) => {
    const [queryClient] = useState(new QueryClient({
      queryCache : new QueryCache({
        onError : (error) => {
          return <Alert.Error message={error.message} />
        }
      })
    }));

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default TanstackQueryProvider


/*
To define a Central Error Parser for all queries and mutations in a TanStack Query application using Next.js, you can utilize the `QueryClient` and its configuration options. You can create a custom error handling function and set it in the `QueryClient` instance. Here's how you can do it:

1. Create a custom error handling function that will parse errors from both queries and mutations.

2. Set up the `QueryClient` with the `defaultOptions` to include your custom error handling.

3. Wrap your application with the `QueryClientProvider` to provide the `QueryClient` instance.

Here’s an example implementation:

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Custom error parser function
const parseError = (error) => {
  console.log(error);
        if (error instanceof z.ZodError) {
            console.log("Zod Errors : ", error.issues);
            let message = error.issues[0].message;
            console.log(message)
            return {message : `${message}`, responseType : ResponseType.warning};
        }
        console.log("NOT ZOD ERROR : ",error);
        const typeOfError : applicationErrors =  checkError(error as Error);
        console.log(typeOfError);
        if(typeOfError===applicationErrors.NETWORK_ERROR){
            return {message : `Server not Running`, responseType : ResponseType.warning};
        }
        return {message : `${ error instanceof Error  && error.message.length>0 ? error.message : "Could Not Register. Try Again"}`, responseType : ResponseType.error};
};

// Create a QueryClient instance with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        const parsedError = parseError(error);
        console.error('Query Error:', parsedError);
      },
    },
    mutations: {
      onError: (error) => {
        const parsedError = parseError(error);
        console.error('Mutation Error:', parsedError);
      },
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
```

In this setup, the `parseError` function is called whenever a query or mutation encounters an error. You can customize the error handling logic as needed. The `onError` callbacks log the parsed errors to the console, but you can also implement additional logic such as displaying error messages to users or sending error reports to a monitoring service.
*/