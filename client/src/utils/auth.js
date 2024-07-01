// Function to set a token in local storage
export const setToken = (token) => {
    localStorage.setItem('token', token); // Store the token under the key 'token'
  };
  
  // Function to get the token from local storage
  export const getToken = () => {
    return localStorage.getItem('token'); // Retrieve the token from local storage
  };
  
  // Function to remove the token from local storage
  export const removeToken = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
  };
  