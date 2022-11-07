const host = 'https://dws-nest-notes-app-production.up.railway.app';

const hadersCreator = (method = undefined, token, body = undefined) => {
  const ans = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  if (method) {
    ans.method = method;
  }

  if (body) {
    ans.body = JSON.stringify(body);
  }

  return ans;
};

export const getAllNotes = async (token) => {
  const headers = hadersCreator(undefined, token);
  const response = await fetch(`${host}/api/notes`, headers);
  const data = await response.json();
  return data;
};

export const getOneNote = async (id, token) => {
  const headers = hadersCreator(undefined, token);
  const response = await fetch(`${host}/api/notes/${id}`, headers);
  const data = await response.json();
  return data;
};

export const createNote = async (token, content) => {
  const headers = hadersCreator('POST', token, { content });
  const response = await fetch(`${host}/api/notes`, headers);
  const data = await response.json();
  return data;
};

export const deleteNote = async (token, id) => {
  const headers = hadersCreator('DELETE', token);
  const response = await fetch(`${host}/api/notes/${id}`, headers);
  const data = await response.json();
  return data;
};

export const updateNote = async (token, id, content) => {
  const headers = hadersCreator('PUT', token, { content });
  const response = await fetch(`${host}/api/notes/${id}`, headers);
  const data = await response.json();
  return data;
};

export const reorderNotes = async (token, notes) => {
  const headers = hadersCreator('PATCH', token, { notes });
  const response = await fetch(`${host}/api/notes`, headers);
  const data = await response.json();
  return data;
};
