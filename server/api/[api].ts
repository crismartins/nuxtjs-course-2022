export default defineEventHandler(event => ({
    path: '/api/' + event.context.params.api,
    query: getQuery(event)
}))