export const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('currentUser'));
}

export const clearCurrentUser = () => {
  localStorage.removeItem('currentUser');
}

export const setCurrentToken = (token) => {
  localStorage.setItem('currentToken', token);
}

export const getCurrentToken = () => {
  return localStorage.getItem('currentToken');
}

export const clearCurrentToken = () => {
  localStorage.removeItem('currentToken');
}
