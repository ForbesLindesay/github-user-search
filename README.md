# GitHub User Search Demo app

This app is a GitHub user search implementation using:

 - URQL to query the GitHub API
 - Tailwind CSS for styling
 - react-window to allow infinite scrolling without requiring pagination

You can try the demo live at https://github-user-search.forbeslindesay.co.uk/

Next steps:

 - Improve the mobile layout (currently there it works but followers and repository counts are not shown)
 - Add tests, especially for the hooks
 - Extract the pagination logic into a shared hook that is not specific to the "user search" endpoint
 - 


## Deployment

This should be handled via CI, but for now, bump the version in these scripts:

### Staging

```
yarn build && \
docker build -t forbeslindesay/github-user-search:local-build-03 . && \
docker push forbeslindesay/github-user-search:local-build-03 && \
ENVIRONMENT=staging DOCKERHUB_USERNAME=forbeslindesay CIRCLE_SHA1=local-build-03 jskube apply -f .kube/deployment.ts
```

### Production

```
ENVIRONMENT=production DOCKERHUB_USERNAME=forbeslindesay CIRCLE_SHA1=local-build-03 jskube apply -f .kube/deployment.ts
```
