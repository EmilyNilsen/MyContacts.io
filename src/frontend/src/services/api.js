import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${PORT}`,
});

export const contactRequestTypeEnum = {
  GetUserContacts: 'GetUserContacts',
  UpdateContacts: 'UpdateContacts',
  DeleteContacts: 'DeleteContacts',
  CreateContacts: 'CreateContacts',
};

export const userRequestTypeEnum = {
  UserLogin: 'UserLogin',
  UserRegister: 'UserRegister',
};

const buildHeadersWithToken = () => {
  const token = localStorage.getItem('token');
  return { headers: { authorization: token } };
};

export const getUserContacts = async () => {
  const { data } = await api.get('/contacts/list-contacts', buildHeadersWithToken());
  return data;
};

export const updateContact = async (body) => {
  api.put('contacts/update', body, buildHeadersWithToken());
};

export const deleteContact = async (contactId) => {
  api.delete(`/contacts/${contactId}`, buildHeadersWithToken());
};

export const createContact = async (body) => {
  api.post('contacts/register', body, buildHeadersWithToken());
};

export async function contactRequestRouter({
  contactRequestType, contactId, body }) {
  switch (contactRequestType) {
  case contactRequestTypeEnum.GetUserContacts:
    return getUserContacts();
  case contactRequestTypeEnum.UpdateContacts:
    await updateContact(body);
    break;
  case contactRequestTypeEnum.DeleteContacts:
    await deleteContact(contactId);
    break;
  case contactRequestTypeEnum.CreateContacts:
    await createContact(body);
    break;
  default:
    break;
  }
}

export const requestLogin = async (body) => api.post('/user/login', body);

export const createUser = async (body) => api.post('/user/register', body);

export async function userRequestRouter(userRequestType, body) {
  switch (userRequestType) {
  case userRequestTypeEnum.UserLogin:
    await requestLogin(body);
    break;
  case userRequestTypeEnum.UserRegister:
    await createUser(body);
    break;
  default:
    break;
  }
}

export default api;
