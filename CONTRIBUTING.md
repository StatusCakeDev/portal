# How To Contribute

Contributions are welcome as we strive to make this documentation as useful as
possible for everyone. However time is not always on our side, and changes may
not be reviewed or merged in a timely manner.

If the documentation is found to be missing information, please open an issue
describing the proposed change - discussing changes ahead of time reduces
friction within pull requests.

## Prerequisites

You will need the following things properly installed on your computer:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) (22+)
- [pnpm](https://pnpm.io/) (the version named in `package.json`)

## Installation

If you wish to work on the portal, clone the repository and install the
dependencies:

```sh
git clone <repository-url>` this repository
cd portal
pnpm install
```

The API reference is generated from the StatusCake OpenAPI specification, which
is not kept in this repository. Save a copy of it as `src/spec/openapi.yaml`
(the directory is ignored by Git) before starting the site or building it.

## Running / Development

```sh
pnpm start
```

Visit the site at [http://localhost:3000](http://localhost:3000). Changes to
the guides in the `guides` directory are reloaded as you save them.

## Running Tests

- `pnpm typecheck` checks the TypeScript configuration and components.
- `pnpm build` builds the site as it will be published. It fails on broken
  links, so run it before opening a pull request.

## Deployment

The website is automatically published when an update is pushed to the master
branch. The state of any active deployment task can be seen in the [GitHub
Actions](https://github.com/StatusCakeDev/portal/actions/workflows/publish.yaml)
tab.

## Making Changes

For additional contributing guidelines visit
[devhandbook.org](https://devhandbook.org/contributing)

## Further Reading / Useful Links

- [Docusaurus](https://docusaurus.io/)
