import axios from 'axios';
export const BASE_URL = "https://epam-forms.vercel.app/form";

export const API = axios.create({
    baseURL: BASE_URL,
  });