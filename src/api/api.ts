import { EmployeeProps, EmployeePayload } from "../components/Employee";

const URL = 'http://localhost:3001';

enum ENDPOINTS {
  employees = '/employees/',
}

enum METHODS {
  get = 'GET',
  post = 'POST',
  patch = 'PATCH',
}

export const fetchWrapper = (endpoint: string, method: METHODS = METHODS.get, body?: {}) => {
  return fetch(`${URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body && {body: JSON.stringify(body)}),
  })
}

export const getEmployees = async (): Promise<EmployeeProps[]> => {
  const raw = await fetchWrapper(ENDPOINTS.employees);
  return raw.json();
}

export const postEmployees = (payload: EmployeePayload) => {
  return fetchWrapper(ENDPOINTS.employees, METHODS.post, payload);
}

export const patchEmployees = (id: string, payload: EmployeePayload) => {
  return fetchWrapper(`${ENDPOINTS.employees}${id}`, METHODS.patch, payload);
}
