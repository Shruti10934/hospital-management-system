import { UserRole } from "@/db/types";
import { ApiError } from "@/lib/api";
import { HttpMethod, Route_ACL, RouteKey } from "./route-acl";
import { hasAnyPermission } from "./utils";

type Role = (typeof UserRole)[number];

export function authorize(
    routeKey: RouteKey,
    method: HttpMethod,
    userRole: Role
): void {
    const routeRule = Route_ACL[routeKey];
    if (!routeRule) throw ApiError.notFound("Route not found");

    const requiredPerms = routeRule[method];
    if (!requiredPerms || requiredPerms.length === 0)
        throw ApiError.methodNotAllowed();

    if (!hasAnyPermission(userRole, requiredPerms))
        throw ApiError.forbidden(
            "You don't have permission to access this resource"
        );

    return;
}

export * from "./permissions";
export * from "./role-permissions";
export * from "./route-acl";
export * from "./utils";

