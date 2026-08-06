export const getInitialActiveWorkspaceId = (storageKey: string): string | null => {
    try {
        return localStorage.getItem(storageKey);
    } catch {
        return null;
    }
};