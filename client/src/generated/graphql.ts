import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost: PostResponse;
};


export type MutationCreatePostArgs = {
  creator: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  creator: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePostMutationVariables = Exact<{
  creator: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, updatedAt: string, title: string, description?: string | null | undefined } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: number, title: string, description?: string | null | undefined, updatedAt: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', username: string, id: number } | null | undefined };

export type PostQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: number, title: string, description?: string | null | undefined } | null | undefined };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: number, updatedAt: string, title: string, description?: string | null | undefined, creator: { __typename?: 'User', id: number, username: string } }> | null | undefined };


export const CreatePostDocument = `
    mutation CreatePost($creator: Float!, $title: String!, $description: String!) {
  createPost(creator: $creator, title: $title, description: $description) {
    id
    updatedAt
    title
    description
  }
}
    `;
export const useCreatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePostMutation, TError, CreatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePostMutation, TError, CreatePostMutationVariables, TContext>(
      'CreatePost',
      (variables?: CreatePostMutationVariables) => fetcher<CreatePostMutation, CreatePostMutationVariables>(client, CreatePostDocument, variables, headers)(),
      options
    );
export const DeletePostDocument = `
    mutation DeletePost($id: Float!) {
  deletePost(id: $id)
}
    `;
export const useDeletePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeletePostMutation, TError, DeletePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeletePostMutation, TError, DeletePostMutationVariables, TContext>(
      'DeletePost',
      (variables?: DeletePostMutationVariables) => fetcher<DeletePostMutation, DeletePostMutationVariables>(client, DeletePostDocument, variables, headers)(),
      options
    );
export const LoginDocument = `
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      'Login',
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(client, LoginDocument, variables, headers)(),
      options
    );
export const LogoutDocument = `
    mutation Logout {
  logout
}
    `;
export const useLogoutMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogoutMutation, TError, LogoutMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogoutMutation, TError, LogoutMutationVariables, TContext>(
      'Logout',
      (variables?: LogoutMutationVariables) => fetcher<LogoutMutation, LogoutMutationVariables>(client, LogoutDocument, variables, headers)(),
      options
    );
export const RegisterDocument = `
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export const useRegisterMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterMutation, TError, RegisterMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterMutation, TError, RegisterMutationVariables, TContext>(
      'Register',
      (variables?: RegisterMutationVariables) => fetcher<RegisterMutation, RegisterMutationVariables>(client, RegisterDocument, variables, headers)(),
      options
    );
export const UpdatePostDocument = `
    mutation UpdatePost($id: Float!, $title: String, $description: String) {
  updatePost(id: $id, title: $title, description: $description) {
    post {
      id
      title
      description
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export const useUpdatePostMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdatePostMutation, TError, UpdatePostMutationVariables, TContext>(
      'UpdatePost',
      (variables?: UpdatePostMutationVariables) => fetcher<UpdatePostMutation, UpdatePostMutationVariables>(client, UpdatePostDocument, variables, headers)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    username
    id
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MeQueryVariables,
      options?: UseQueryOptions<MeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MeQuery, TError, TData>(
      variables === undefined ? ['Me'] : ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(client, MeDocument, variables, headers),
      options
    );
export const PostDocument = `
    query Post($id: Float!) {
  post(id: $id) {
    id
    title
    description
  }
}
    `;
export const usePostQuery = <
      TData = PostQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: PostQueryVariables,
      options?: UseQueryOptions<PostQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostQuery, TError, TData>(
      ['Post', variables],
      fetcher<PostQuery, PostQueryVariables>(client, PostDocument, variables, headers),
      options
    );
export const PostsDocument = `
    query Posts {
  posts {
    id
    updatedAt
    title
    description
    creator {
      id
      username
    }
  }
}
    `;
export const usePostsQuery = <
      TData = PostsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: PostsQueryVariables,
      options?: UseQueryOptions<PostsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<PostsQuery, TError, TData>(
      variables === undefined ? ['Posts'] : ['Posts', variables],
      fetcher<PostsQuery, PostsQueryVariables>(client, PostsDocument, variables, headers),
      options
    );