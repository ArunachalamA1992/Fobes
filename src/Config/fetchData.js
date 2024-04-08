import {api} from './api';

const api_name = 'api/';

export default {
  login_with_pass: (data, token) => {
    let url = api_name + 'users/login';
    return api.postMethod(url, data, token);
  },
  verify_OTP: (data, token) => {
    let url = api_name + 'Login/verify_otp';
    return api.postMethod(url, data, token);
  },
  register: (data, token) => {
    let url = api_name + 'users/register';
    return api.postMethod(url, data, token);
  },
  candidates_profile: (data, token) => {
    let url = api_name + 'candidates';
    return api.patchMethod(url, data, token);
  },
};
