import helmet from "helmet";

// Define your custom Helmet configuration
export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return helmet({
            contentSecurityPolicy: false,
            hsts: false,
            hidePoweredBy: true,
            noSniff: true,
            referrerPolicy: { policy: "no-referrer" }, 
            frameguard: { action: "sameorigin" },       
            crossOriginResourcePolicy: { policy: "same-origin" }, 
            ieNoOpen: true,
            dnsPrefetchControl: { allow: false },
        });
    }

    return helmet({
        contentSecurityPolicy: false,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        hidePoweredBy: true,
        noSniff: true,
        referrerPolicy: { policy: "no-referrer" },          
        frameguard: { action: "deny" },                     
        crossOriginResourcePolicy: { policy: "same-origin" },
        ieNoOpen: true,
        dnsPrefetchControl: { allow: false },
    });
};