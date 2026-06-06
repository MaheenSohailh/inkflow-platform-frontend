export const setToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');

export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => {
  const user = localStorage.getItem('user');

  // 🔥 Safe Check: Agar user nahi mila, ya uski value string "undefined" hai
  if (!user || user === "undefined") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
    return null;
  }
};
export const removeUser = () => localStorage.removeItem('user');


export const isAuthorized = () => {
  const token = getToken();
  const user = getUser();
  return !!token && !!user; /// Boolean(token)
};