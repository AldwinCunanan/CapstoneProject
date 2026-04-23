export interface AuthorizationOptions {
    hasRole: Array<"admin" | "staff" | "user">;
    allowSameUser?: boolean;
}