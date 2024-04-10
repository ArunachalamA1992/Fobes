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
  list_jobs: (data, token) => {
    let url = api_name + 'jobs';
    return api.getMethod(url, data, token);
  },
  single_candidate: (data, token) => {
    let url = api_name + 'candidates';
    return api.getMethod(url, data, token);
  },
  get_education: (data, token) => {
    let url = api_name + 'job/education';
    return api.getMethod(url, data, token);
  },
  get_experience: (data, token) => {
    let url = api_name + 'job/experience';
    return api.getMethod(url, data, token);
  },
  list_skills: (data, token) => {
    let url = api_name + 'job/skills';
    return api.getMethod(url, data, token);
  },
  list_language: (data, token) => {
    let url = api_name + 'job/language';
    return api.getMethod(url, data, token);
  },
  upload_resume: (data, token) => {
    let url = api_name + 'cv';
    return api.postMethod(url, data, token);
  },
  list_bookmarks: (data, token) => {
    let url = api_name + 'candidates/bookmarks';
    return api.getMethod(url, data, token);
  },
  toggle_bookmarks: (data, token) => {
    let url = api_name + 'candidates/bookmarks';
    return api.postMethod(url, data, token);
  },
};
