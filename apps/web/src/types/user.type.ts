export const UserType = ["Consumer", "Vendor"] as const;

export type TUserType = (typeof UserType)[number];
