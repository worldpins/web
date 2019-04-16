
// webpack.d.ts
declare module "*.gql" {
  const content: any;
  export const createMap: any;
  export const map: any;
  export const maps: any;
  export const createTemplatePin: any;
  export const updateTemplatePin: any;
  export const login: any;
  export const register: any;
  export default content;
}

declare module "*.graphql" {
  const content: any;
  export default content;
}
