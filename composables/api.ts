export const callAPI = async (path) => {
    const apiPrefix = API_URL
    return await $fetch(path, {baseUrl: apiPrefix})
}