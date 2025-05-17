export const PUBLIC_ROUTES = {
    HOME: '/',
    LOGIN: '/sign-in',
    REGISTER: '/sign-up',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    PRICING: '/pricing',
    CONTACT: '/contact',
} as const;

export const PRIVATE_ROUTES = {
    DASHBOARD: '/dashboard',
    PROFILE: '/dashboard/profile',
    SETTINGS: '/dashboard/settings',
    DOCUMENTS: '/dashboard/documents',
} as const;

// Default redirect paths
export const DEFAULT_LOGIN_REDIRECT = PRIVATE_ROUTES.DASHBOARD;
export const DEFAULT_LOGOUT_REDIRECT = PUBLIC_ROUTES.HOME; 