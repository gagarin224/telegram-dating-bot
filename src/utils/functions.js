export const validateConfig = (config) => {
    const { token, dataURL, min, max } = config;

    if (!token) {
        throw new Error('Invalid configuration: token cannot be empty.');
    }

    if (!dataURL) {
        throw new Error('Invalid configuration: dataURL cannot be empty.');
    }

    if (!min || min <= 0 || !Number(min)) {
        throw new Error('Invalid configuration: min cannot be empty, should be a number and greater than 0');
    }

    if (!max || max <= 0 || !Number(max)) {
        throw new Error('Invalid configuration: max cannot be empty, should be a number and greater than 0');
    }
};