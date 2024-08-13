import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddBlogContextInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Pic>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type AddUserInput = {
  avatar?: InputMaybe<Pic>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type BlogContext = {
  __typename?: 'BlogContext';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy: CreatedByUser;
  description: Scalars['String']['output'];
  photo: Picture;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type CreatedByUser = {
  __typename?: 'CreatedByUser';
  id?: Maybe<Scalars['ID']['output']>;
  username: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBlogContext: BlogContext;
  addUser: User;
  addVideoBlogContext: VideoBlogContext;
  deleteBlogContext: BlogContext;
  deleteUser: User;
  deleteVideoContext: VideoBlogContext;
  editBlogContext: BlogContext;
  editUser: User;
  editVideoContext: VideoBlogContext;
  loginUser: User;
};


export type MutationAddBlogContextArgs = {
  newBlogContextData?: InputMaybe<AddBlogContextInput>;
};


export type MutationAddUserArgs = {
  newUserData?: InputMaybe<AddUserInput>;
};


export type MutationAddVideoBlogContextArgs = {
  newVideoBlogContextData?: InputMaybe<AddVideoBlogContextInput>;
};


export type MutationDeleteBlogContextArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteVideoContextArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEditBlogContextArgs = {
  edits?: InputMaybe<BlogContextEdits>;
  id: Scalars['ID']['input'];
};


export type MutationEditUserArgs = {
  edits?: InputMaybe<UserEdits>;
  id: Scalars['ID']['input'];
};


export type MutationEditVideoContextArgs = {
  edits?: InputMaybe<VideoBlogContextEdits>;
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  inputData: LoginInput;
};

export type Pic = {
  public_id?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Picture = {
  __typename?: 'Picture';
  public_id?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  blogContext: BlogContext;
  blogContexts: Array<BlogContext>;
  user: User;
  users: Array<User>;
  videoBlogContext: VideoBlogContext;
  videoBlogContexts: Array<VideoBlogContext>;
};


export type QueryBlogContextArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryVideoBlogContextArgs = {
  id: Scalars['ID']['input'];
};

export enum RoleSet {
  Admin = 'Admin',
  Editor = 'Editor',
  User = 'User'
}

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  avatar: Picture;
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role?: Maybe<RoleSet>;
  token: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type VideoBlogContext = {
  __typename?: 'VideoBlogContext';
  _id: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy: CreatedByUser;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
};

export type AddVideoBlogContextInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BlogContextEdits = {
  description?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Pic>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserEdits = {
  avatar?: InputMaybe<Pic>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type VideoBlogContextEdits = {
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddBlogContextInput: AddBlogContextInput;
  AddUserInput: AddUserInput;
  BlogContext: ResolverTypeWrapper<BlogContext>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatedByUser: ResolverTypeWrapper<CreatedByUser>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  LoginInput: LoginInput;
  Mutation: ResolverTypeWrapper<{}>;
  Pic: Pic;
  Picture: ResolverTypeWrapper<Picture>;
  Query: ResolverTypeWrapper<{}>;
  RoleSet: RoleSet;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  VideoBlogContext: ResolverTypeWrapper<VideoBlogContext>;
  addVideoBlogContextInput: AddVideoBlogContextInput;
  blogContextEdits: BlogContextEdits;
  userEdits: UserEdits;
  videoBlogContextEdits: VideoBlogContextEdits;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddBlogContextInput: AddBlogContextInput;
  AddUserInput: AddUserInput;
  BlogContext: BlogContext;
  Boolean: Scalars['Boolean']['output'];
  CreatedByUser: CreatedByUser;
  ID: Scalars['ID']['output'];
  LoginInput: LoginInput;
  Mutation: {};
  Pic: Pic;
  Picture: Picture;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  VideoBlogContext: VideoBlogContext;
  addVideoBlogContextInput: AddVideoBlogContextInput;
  blogContextEdits: BlogContextEdits;
  userEdits: UserEdits;
  videoBlogContextEdits: VideoBlogContextEdits;
};

export type BlogContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlogContext'] = ResolversParentTypes['BlogContext']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['CreatedByUser'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  photo?: Resolver<ResolversTypes['Picture'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatedByUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatedByUser'] = ResolversParentTypes['CreatedByUser']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addBlogContext?: Resolver<ResolversTypes['BlogContext'], ParentType, ContextType, Partial<MutationAddBlogContextArgs>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationAddUserArgs>>;
  addVideoBlogContext?: Resolver<ResolversTypes['VideoBlogContext'], ParentType, ContextType, Partial<MutationAddVideoBlogContextArgs>>;
  deleteBlogContext?: Resolver<ResolversTypes['BlogContext'], ParentType, ContextType, RequireFields<MutationDeleteBlogContextArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  deleteVideoContext?: Resolver<ResolversTypes['VideoBlogContext'], ParentType, ContextType, RequireFields<MutationDeleteVideoContextArgs, 'id'>>;
  editBlogContext?: Resolver<ResolversTypes['BlogContext'], ParentType, ContextType, RequireFields<MutationEditBlogContextArgs, 'id'>>;
  editUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditUserArgs, 'id'>>;
  editVideoContext?: Resolver<ResolversTypes['VideoBlogContext'], ParentType, ContextType, RequireFields<MutationEditVideoContextArgs, 'id'>>;
  loginUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'inputData'>>;
};

export type PictureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Picture'] = ResolversParentTypes['Picture']> = {
  public_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  blogContext?: Resolver<ResolversTypes['BlogContext'], ParentType, ContextType, RequireFields<QueryBlogContextArgs, 'id'>>;
  blogContexts?: Resolver<Array<ResolversTypes['BlogContext']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  videoBlogContext?: Resolver<ResolversTypes['VideoBlogContext'], ParentType, ContextType, RequireFields<QueryVideoBlogContextArgs, 'id'>>;
  videoBlogContexts?: Resolver<Array<ResolversTypes['VideoBlogContext']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['Picture'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['RoleSet']>, ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoBlogContextResolvers<ContextType = any, ParentType extends ResolversParentTypes['VideoBlogContext'] = ResolversParentTypes['VideoBlogContext']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['CreatedByUser'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BlogContext?: BlogContextResolvers<ContextType>;
  CreatedByUser?: CreatedByUserResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Picture?: PictureResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  VideoBlogContext?: VideoBlogContextResolvers<ContextType>;
};

