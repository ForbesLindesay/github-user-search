import createIngress from './createIngress';
import createServiceAccount from './createServiceAccount';

export default [
  ...createServiceAccount({namespace: 'github-user-search'}),
  ...createIngress({
    name: 'github-user-search-staging',
    namespace: 'github-user-search',
    serviceName: 'github-user-search-staging',
    hosts: ['github-user-search.staging.forbeslindesay.co.uk'],
    enableTLS: true,
    stagingTLS: false,
  }),
  ...createIngress({
    name: 'github-user-search-production',
    namespace: 'github-user-search',
    serviceName: 'github-user-search-production',
    hosts: ['github-user-search.forbeslindesay.co.uk'],
    enableTLS: true,
    stagingTLS: false,
  }),
];
