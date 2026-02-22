import { UserRole } from "@/db/types";
import { type Permission } from "./permissions";
import { RolePermissions } from "./role-permissions";

type Role = (typeof UserRole)[number];

// Role has a specific permission
export function hasPermission(role: Role, permission: Permission): boolean {
    const perms = RolePermissions[role];
    if (!perms) return false;
    return perms.has(permission);
}

// Role has any permission
export function hasAnyPermission(role: Role, required: Permission[]): boolean {
    if (required.length === 0) return false;

    const perms = RolePermissions[role];
    if (!perms) return false;

    return required.some(p => perms.has(p));
}
