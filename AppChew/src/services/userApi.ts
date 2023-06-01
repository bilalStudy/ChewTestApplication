import axios from 'axios';

const UserApi = (() => {
  const userApiEndpoints = {
    login: 'http://localhost:3000/api/users/login',
  };

  const getTeacherUser = async (username: string, password: string) => {
    const result = await axios.get(userApiEndpoints.login);
    return result;
  };
})();
