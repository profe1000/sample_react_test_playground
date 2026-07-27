import instance from "../utils/axios.wrapper";
import { convertObjToQueryParams } from "../utils/basic.utils";

export const adminAuthSignIn = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/login", body);
  const result = await data;
  return result;
};

export const adminAuthSessionLogin = async () => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get("api/v1/admin/me");
  const result = await data;
  return result;
};

export const adminGetDashboardDetails = async () => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get("api/v1/analytics/combine");
  const result = await data;
  return result;
};

export const adminAddAdmin = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/admins", body);
  const result = await data;
  return result;
};

export const adminEditAdmin = async (id: string | number, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/admins/${id}`, body);
  const result = await data;
  return result;
};

// Get Site Admin
export const getAdmins = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

export const getAdminsActivities = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/activities${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

export const getAdmin = async (id: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/${id}`);
  const result: any = await data;
  return result;
};

export const blockAdmin = async (id: string | number, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post(`api/v1/admin/admins/${id}/block`, body);
  const result: any = await data;
  return result;
};

export const resetAdminPassword = async (id: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patchForm(`api/v1/admin/admins/${id}/password`);
  const result: any = await data;
  return result;
};

export const changeAdminPassword = async (body) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post(`api/v1/admin/auth/reset-password`, body);
  const result: any = await data;
  return result;
};

// Get Site Users
export const getUsers = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/members/${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

export const checkInMember = async (memberId: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/members/${memberId}/check-in`);
  return data;
};

export const checkOutMember = async (memberId: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/members/${memberId}/check-out`);
  return data;
};

export const getUser = async (id: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/users/${id}`);
  const result: any = await data;
  return result;
};

export const blockUser = async (id: string | number, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post(`api/v1/admin/users/${id}/block`, body);
  const result: any = await data;
  return result;
};

export const adminAddUsers = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/users", body);
  const result = await data;
  return result;
};

export const adminEditUsers = async (id: string | number, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/users/${id}`, body);
  const result = await data;
  return result;
};

export const adminValidateBankAccount = async (body?: any) => {
  const axios = await instance(null, null, true);
  const { data } = await axios.get(
    `api/v1/user-verification/validate-bank-account${convertObjToQueryParams(
      body
    )}`
  );
  const result = await data;
  return result;
};

// Get Admin Roles
export const getAdminRoles = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `admin/roles${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

export const getAdminRole = async (id: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/admin-roles/${id}`);
  const result: any = await data;
  return result;
};

// Admin Notifications
export const getAdminNotifications = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/notifications${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

// Admin Get User Growths
export const getAdminUserGrowth = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/dashboard/user-growth${convertObjToQueryParams(body)}`
  );
  const result: any = await data;
  return result;
};

export const getAdminNotification = async (id: string | number) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/notifications/${id}`);
  const result: any = await data;
  return result;
};

export const adminGetSettings = async () => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get("api/v1/admin/settings");
  const result = await data;
  return result;
};

// Admin Save settings
export const adminSaveSettings = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put("api/v1/admin/settings", body);
  const result = await data;
  return result;
};
