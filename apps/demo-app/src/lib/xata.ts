// Generated by Xata Codegen 0.28.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
      {
        name: "actualImage",
        type: "file",
        file: { defaultPublicAccess: true },
      },
    ],
    revLinks: [
      { column: "user", table: "accounts" },
      { column: "user", table: "users_accounts" },
      { column: "user", table: "users_sessions" },
      { column: "user", table: "sessions" },
    ],
  },
  {
    name: "accounts",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "users_accounts" }],
  },
  {
    name: "verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "account", type: "link", link: { table: "accounts" } },
    ],
  },
  {
    name: "users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "users" } },
      { name: "session", type: "link", link: { table: "sessions" } },
    ],
  },
  {
    name: "sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
    revLinks: [{ column: "session", table: "users_sessions" }],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type Accounts = InferredTypes["accounts"];
export type AccountsRecord = Accounts & XataRecord;

export type VerificationTokens = InferredTypes["verificationTokens"];
export type VerificationTokensRecord = VerificationTokens & XataRecord;

export type UsersAccounts = InferredTypes["users_accounts"];
export type UsersAccountsRecord = UsersAccounts & XataRecord;

export type UsersSessions = InferredTypes["users_sessions"];
export type UsersSessionsRecord = UsersSessions & XataRecord;

export type Sessions = InferredTypes["sessions"];
export type SessionsRecord = Sessions & XataRecord;

export type DatabaseSchema = {
  users: UsersRecord;
  accounts: AccountsRecord;
  verificationTokens: VerificationTokensRecord;
  users_accounts: UsersAccountsRecord;
  users_sessions: UsersSessionsRecord;
  sessions: SessionsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://superplexo-t1ubk3.us-east-1.xata.sh/db/superplexo",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
