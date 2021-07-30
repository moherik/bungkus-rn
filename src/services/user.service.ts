import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from 'models/user.model';
import {BASE_API_URL} from 'utils/constants';

interface LoginPayload {
  phone: string;
  token: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
  endpoints: builder => ({
    checkUser: builder.query<User, null>({
      query: () => 'users/me',
    }),

    signIn: builder.mutation<User, LoginPayload>({
      query: body => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useCheckUserQuery, useSignInMutation} = userApi;
