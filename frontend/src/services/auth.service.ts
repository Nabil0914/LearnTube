import { apiRequest } from './api.service';

export const loginUser = (payload: {
  username: string;
  password: string;
}) => {
  return apiRequest('/v1/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const registerUser = (payload: {
  username: string;
  email: string;
  password: string;
}) => {
  return apiRequest('/v1/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
