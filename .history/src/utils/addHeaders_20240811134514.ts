// fetchUtils.ts

interface RequestOptions extends RequestInit {
    headers?: HeadersInit;
  }
  
  export const fetchWithHeaders = async (url: string,user : Login options: RequestOptions = {}) => {
    // Retrieve user details from sessionStorage (client-side)
    const userdetails = sessionStorage.getItem('userdetails');
    let user: { email?: string; password?: string } = {};
  
    if (userdetails) {
      user = JSON.parse(userdetails);
    }
  
    // Initialize headers
    let headers = new Headers(options.headers);
  
    // Add Authorization header if user details are available
    if (user && user.password && user.email) {
      headers.append('Authorization', 'Basic ' + btoa(`${user.email}:${user.password}`));
    }
  
    // Retrieve XSRF token from sessionStorage (client-side)
    const xsrf = sessionStorage.getItem('XSRF-TOKEN');
    if (xsrf) {
      headers.append('X-XSRF-TOKEN', xsrf);
    }
  
    // Add X-Requested-With header
    headers.append('X-Requested-With', 'XMLHttpRequest');
  
    // Merge headers with any existing headers in options
    const requestOptions: RequestOptions = {
      ...options,
      headers: headers,
      credentials: 'include', // include credentials such as cookies
    };
  
    try {
      const response = await fetch(url, requestOptions);
        console.log(response)
      if (!response.ok) {
        // Handle non-200 responses
        if (response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          console.error('Unauthorized access');
        }
        console.log(await response.text(), "JSON REsponse")
        throw new Error('Network response was not ok');
      }
  
      return response;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error instanceof Error && error.message);
      throw error;
    }
  };
  