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

const buildHeadersWithToken = () => {
  const token = localStorage.getItem('token');
  return { headers: { authorization: token } };
};

export const requestLogin = async (endpooint, body) => {
  const response = await api.post(endpooint, body);
  return response;
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

export default api;
