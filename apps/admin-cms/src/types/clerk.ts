// Define an enum for access levels, including organization roles
export enum AccessLevel {
  Admin = "org:admin",
  Member = "org:member",
  All = "*", // Represents all users regardless of role
}

export interface OrgMember {
  role: AccessLevel; // Use the AccessLevel enum here
  email: string;
  userId: string;
}
