export const withOutPassword = (arr: {password: string}) => {
    const { password, ...rest } = arr;
    return rest;
};