import axios from 'axios';

const UserApi = (() => {
  const userApiEndpoints = {
    login: 'http://localhost:3000/api/users/login',
  };

  const getTeacherUser = async (username: string, password: string) => {
    const response = await axios.post(userApiEndpoints.login, {
      username,
      password,
    });
    return response.data;
  };

  return {
    getTeacherUser,
  };
})();

export default UserApi;
