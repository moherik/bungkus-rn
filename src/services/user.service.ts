import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User} from 'models/user.model';
import {BASE_API_URL} from 'utils/constants';

interface SignInPayload {
  phone: string;
  name?: string | null | undefined;
  token?: string | undefined;
}

interface SignInResponse {
  code: number;
  data: {
    userId: number;
    name?: string | undefined;
    jwtToken: string;
  };
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
  endpoints: builder => ({
    checkUser: builder.query<User, null>({
      query: () => 'users/me',
    }),

    signIn: builder.mutation<SignInResponse, SignInPayload>({
      query: body => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useCheckUserQuery, useSignInMutation} = userApi;
