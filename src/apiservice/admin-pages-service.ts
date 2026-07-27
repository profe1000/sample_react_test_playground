import instance from "../utils/axios.wrapper";
import { convertObjToQueryParams } from "../utils/basic.utils";

// Transactions
export const adminAddTransactions = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/transactions", body);
  const result = await data;
  return result;
};

export const adminGetTransactions = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/transactions${convertObjToQueryParams(body)}`
  );
  const result = await data;
  return result;
};

export const adminGetTransactionSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/transactions/${id}`);
  const result = await data;
  return result;
};

// Transfer

export const adminGetTransfer = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/transfer-out-3p${convertObjToQueryParams(body)}`
  );
  const result = await data;
  return result;
};

export const adminGetTransferSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/transfer-out-3p/${id}`);
  const result = await data;
  return result;
};

export const adminInitiateTransfer = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post(
    "api/v1/admin/transfer-out-3p/initiate",
    body
  );
  const result = await data;
  return result;
};

// Transaction Dispute
export const adminGetTransactionsDisputes = async (body?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/transaction-disputes${convertObjToQueryParams(body)}`
  );
  const result = await data;
  return result;
};

export const adminGetTransactionsDisputesSingle = async (
  id: number | string
) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/transaction-disputes/${id}`);
  const result = await data;
  return result;
};

export const admiUpdateTransactionsDispute = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch("api/v1/admin/transaction-disputes", body);
  const result = await data;
  return result;
};

// Admin Book Api Url
export const adminAddBook = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/books", body);
  return data;
};

export const adminGetBooks = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/books${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetBookSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/books/${id}`);
  return data;
};

export const adminUpdateBook = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/books/${id}`, body);
  return data;
};

export const adminDeleteBook = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/books/${id}`);
  return data;
};

export const adminUpdateBookFile = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/books/${id}/file`, body);
  return data;
};

export const adminUpdateBookCover = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(
    `api/v1/admin/books/${id}/cover-image`,
    body
  );
  return data;
};

// Books Audios

// Admin Book Audio Url
export const adminAddBookAudio = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post(`api/v1/admin/book-audios`, body);
  return data;
};

export const adminGetBookAudios = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/book-audios${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetBookAudioSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/book-audios/${id}`);
  return data;
};

export const adminUpdateBookAudio = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/book-audios/${id}`, body);
  return data;
};

export const adminDeleteBookAudio = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/book-audios/${id}`);
  return data;
};

// Book Categories

export const adminAddDistrict = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/district", body);
  return data;
};

export const adminGetDistrict = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/district${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetDistrictSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/district/${id}`);
  return data;
};

export const adminUpdateDistrict = async (
  id: number | string,
  body: any
) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/district/${id}`, body);
  return data;
};

export const adminDeleteDistrict = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/district/${id}`);
  return data;
};

// Book Groups

export const adminAddBookGroup = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/book-groups", body);
  return data;
};

export const adminGetBookGroups = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/book-groups${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetBookGroupSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/book-groups/${id}`);
  return data;
};

export const adminUpdateBookGroup = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/book-groups/${id}`, body);
  return data;
};

export const adminDeleteBookGroup = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/book-groups/${id}`);
  return data;
};

export const adminUpdateBookGroupImage = async (
  id: number | string,
  body: any
) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/book-groups/${id}`, body);
  return data;
};

// Book Authors

export const adminAddAuthor = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/authors", body);
  return data;
};

export const adminGetAuthors = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/authors${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetAuthorSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/authors/${id}`);
  return data;
};

export const adminUpdateAuthor = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/authors/${id}`, body);
  return data;
};

export const adminUpdateAuthorImage = async (
  id: number | string,
  body: any
) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/authors/${id}/image`, body);
  return data;
};

export const adminDeleteAuthor = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/authors/${id}`);
  return data;
};

// Short Categories

export const adminAddShortCategory = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/short-categories", body);
  return data;
};

export const adminGetShortCategories = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/short-categories${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetShortCategorySingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/short-categories/${id}`);
  return data;
};

export const adminUpdateShortCategory = async (
  id: number | string,
  body: any
) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/short-categories/${id}`, body);
  return data;
};

export const adminDeleteShortCategory = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/short-categories/${id}`);
  return data;
};

// Pricing
export const adminGetPricing = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/subscription-pricings${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetPricingSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/subscription-pricings/${id}`);
  return data;
};

export const adminUpdatePricing = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(
    `api/v1/admin/subscription-pricings/${id}`,
    body
  );
  return data;
};

// Book Shorts

export const adminAddShort = async (body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.post("api/v1/admin/shorts", body);
  return data;
};

export const adminGetShorts = async (query?: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(
    `api/v1/admin/shorts${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetShortSingle = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.get(`api/v1/admin/shorts/${id}`);
  return data;
};

export const adminUpdateShort = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.put(`api/v1/admin/shorts/${id}`, body);
  return data;
};

export const adminDeleteShort = async (id: number | string) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.delete(`api/v1/admin/shorts/${id}`);
  return data;
};

export const adminUpdateShortImage = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(
    `api/v1/admin/shorts/${id}/thumbnail`,
    body
  );
  return data;
};

export const adminUpdateShortVideo = async (id: number | string, body: any) => {
  const axios = await instance(null, null, true, true);
  const { data } = await axios.patch(`api/v1/admin/shorts/${id}/video`, body);
  return data;
};

// Temporarly APi
export const adminGetBooksTest = async (query?: any) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false,
    false
  );
  const { data } = await axios.get(
    `/api/books${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetBooksSingleTest = async (id?: number | string) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false,
    false
  );
  const { data } = await axios.get(`/api/books/${id}`);
  return data;
};

export const adminGetAuthorsTest = async (query?: any) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false,
    false
  );
  const { data } = await axios.get(
    `/api/authors${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetCategoriesTest = async (query?: any) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false,
    false
  );
  const { data } = await axios.get(
    `/api/categories${convertObjToQueryParams(query)}`
  );
  return data;
};

export const adminGetTagsTest = async (query?: any) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false,
    false
  );
  const { data } = await axios.get(
    `/api/tags${convertObjToQueryParams(query)}`
  );
  return data;
};

// Temporarly APi
export const adminGetShortTest = async (query?: any) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false
  );
  const { data } = await axios.get(
    `/api/shorts${convertObjToQueryParams(query)}` // Changed 'short' to 'shorts'
  );
  return data;
};

export const adminGetShortSingleTest = async (id?: number | string) => {
  const axios = await instance(
    "",
    "https://next-js-practice-keyway-app.vercel.app/",
    false
  );
  const { data } = await axios.get(`/api/shorts/${id}`); // Changed 'short' to 'shorts'
  return data;
};
