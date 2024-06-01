import axios from 'axios';
import { LogIn, SignIn } from '../../constants/requestOptions';
import { API_LOGIN, API_LOGOUT, API_ME, API_REGISTER } from '../../constants/routes';


// Register user
const register = async (userData: SignIn) => {
  const response = await axios.post(API_REGISTER, userData);
  if (response.status === 201) {
    // This response emitting the user object with the name, email and the token. We are only storing token in the local storage.
    const { token } = response.data;
    localStorage.setItem('userToken', JSON.stringify(token));
  }
  return response.data;
}

// Log in user.
const login = async function(user: LogIn) {
  const response = await axios.post(API_LOGIN, user);
  if (response.status === 200 || response.status === 201) {
    // This response emitting the user object with the name, email and the token. We are only storing token in the local storage.
    const { token } = await response.data;
    localStorage.setItem('userToken', JSON.stringify(token));
  }
  return response.data;
}

const me = async function(token: string | null) {
  if (!token) return null;

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(API_ME, { headers });

    if (response.status === 403 || response.status === 401) {
      localStorage.removeItem('userToken');
    }

    return response.data;
  } catch (error: any) {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem('userToken');
    }
    return null; // or handle it appropriately
  }
};

// Logout user.
const logout = async function(token: string | null) {
  if(!token) return null;
  // Set token in the authorization headers.
  const headers = { Authorization: `Bearer ${token}`};

  const response = await axios.delete(API_LOGOUT, { headers });
  if(response.status === 200) {
    localStorage.removeItem('userToken');
  }
  return await response.data;
}

const authService = {
  me,
  login,
  logout,
  register,
};

export default authService;