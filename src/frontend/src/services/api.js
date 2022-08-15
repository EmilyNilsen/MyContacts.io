import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

const buildApiResponseWithStatusCode = ({ data, status = null }) => {
  const apiResponse = {
    data: data.apiResponse,
    errors: data.errors,
    statusCode: status || {},
  };
  return { apiResponse };
};

export const contactRequestTypeEnum = {
  GetUserContacts: 'GetUserContacts',
  UpdateContacts: 'UpdateContacts',
  DeleteContacts: 'DeleteContacts',
  CreateContacts: 'CreateContacts',
};

const buildHeadersWithToken = () => {
  const token = localStorage.getItem('token');
  return { headers: { authorization: token } };
};

export const getUserContacts = async () => {
  const { data, status } = await api.get(
    '/contacts/list-contacts',
    buildHeadersWithToken(),
  ).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data, status });
};

export const updateContact = async (body) => {
  const { data, status } = await api.put(
    'contacts/update',
    body,
    buildHeadersWithToken(),
  ).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data, status });
};

export const deleteContact = async (contactId) => {
  const { data, status } = await api.delete(
    `/contacts/${contactId}`,
    buildHeadersWithToken(),
  ).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data, status });
};

export const createContact = async (body) => {
  const { data, status } = await api.post(
    'contacts/register',
    body,
    buildHeadersWithToken(),
  ).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data, status });
};

export async function contactRequestRouter({
  contactRequestType, contactId, body }) {
  switch (contactRequestType) {
  case contactRequestTypeEnum.GetUserContacts:
    return getUserContacts();
  case contactRequestTypeEnum.UpdateContacts:
    return updateContact(body);
  case contactRequestTypeEnum.DeleteContacts:
    return deleteContact(contactId);
  case contactRequestTypeEnum.CreateContacts:
    return createContact(body);
  default:
    break;
  }
}

export const userRequestTypeEnum = {
  UserLogin: 'UserLogin',
  UserRegister: 'UserRegister',
};

export const requestLogin = async (body) => {
  const { data } = await api.post('/user/login', body).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data });
};

export const createUser = async (body) => {
  const { data } = await api.post('/user/register', body).catch((e) => e.response);
  return buildApiResponseWithStatusCode({ data });
};

export async function userRequestRouter(userRequestType, body) {
  switch (userRequestType) {
  case userRequestTypeEnum.UserLogin:
    return requestLogin(body);
  case userRequestTypeEnum.UserRegister:
    return createUser(body);
  default:
    break;
  }
}

export default api;
