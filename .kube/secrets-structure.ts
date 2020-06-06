import createSecret from './createSecrets';

// To set secrets:
//   - create `secrets.ts` in this folder
//   - run `jskube .kube/secrets.ts`
//   - delete `secrets.ts`
// The code for `secrets.ts` is in 1password
interface Secrets {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}
export default function secrets(data: {staging: Secrets; production: Secrets}) {
  return [
    createSecret({
      name: 'github-user-search-staging',
      namespace: 'github-user-search',
      data: {...data.staging, BASE_URL: 'https://github-user-search.staging.forbeslindesay.co.uk'} as any,
    }),
    createSecret({
      name: 'github-user-search-production',
      namespace: 'github-user-search',
      data: {...data.production, BASE_URL: 'https://github-user-search.forbeslindesay.co.uk'}  as any,
    }),
  ];
}
