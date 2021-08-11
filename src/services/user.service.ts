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

interface UpdateNamePayload {
  name: string;
  token: string;
}

interface UserResponse {
  code: number;
  data: User;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({baseUrl: BASE_API_URL}),
  endpoints: builder => ({
    checkUser: builder.query<UserResponse, string>({
      query: token => ({
        url: 'users/me',
        method: 'GET',
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),

    signIn: builder.mutation<SignInResponse, SignInPayload>({
      query: body => ({
        url: 'auth/signin',
        method: 'POST',
        body,
      }),
    }),

    updateName: builder.mutation<UserResponse, UpdateNamePayload>({
      query: ({name, token}) => ({
        url: 'users/update-name',
        method: 'PATCH',
        body: {name},
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {useCheckUserQuery, useSignInMutation, useUpdateNameMutation} =
  userApi;
