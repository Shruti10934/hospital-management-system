import { users } from "@/db/schema";

export const PublicUserFields = {
    id: users.id,
    name: users.name,
    email: users.email,
    phone: users.phone,
    role: users.role,
    isVerified: users.isVerified,
    isActive: users.isActive,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
} as const;
export type PublicUserFields = typeof PublicUserFields;
