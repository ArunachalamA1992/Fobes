import {api} from './api';

const api_name = 'api/';

export default {
  login_with_pass: data => {
    let url = api_name + 'users/login';
    return api.postMethod(url, data);
  },
  verify_OTP: data => {
    let url = api_name + 'Login/verify_otp';
    return api.postMethod(url, data);
  },
  register: data => {
    let url = api_name + 'api/users/register';
    return api.postMethod(url, data);
  },
  candidates_profile: data => {
    let url = api_name + 'api/candidates';
    return api.patchMethod(url, data);
  },
};
