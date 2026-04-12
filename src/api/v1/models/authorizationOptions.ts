export interface AuthorizationOptions {
    hasRole: Array<"admin" | "staff">;
    allowSameUser?: boolean;
}