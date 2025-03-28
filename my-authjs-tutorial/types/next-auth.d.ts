declare module 'next-auth' {
    interface Session {
        userId?: string;
        organizationId?: string
    }
};

interface User extends DefaultUser {
    organizationId: string;
}