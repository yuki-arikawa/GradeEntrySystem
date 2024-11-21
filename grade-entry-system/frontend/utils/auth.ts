export const getToken = () => {
  if(typeof window !== 'undefined'){
    return localStorage.getItem('jwt');
  }
  return null;
};

export const saveToken = (token: string) => {
  if(typeof window !== 'undefined'){
    localStorage.setItem('jwt', token);
  }
};

export const removeToken = () => {
  if(typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
}