// users/:id
export function buildRputePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    // para na primeira vez que achar, /g todos
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    return pathRegex
}