import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from 'models/user.model';
import {BASE_API_URL} from 'utils/constants';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
  endpoints: builder => ({
    login: builder.query<User, string>({
      query: name => `auth/${name}`,
    }),
  }),
});

export const {useLoginQuery} = authApi;
