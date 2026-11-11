# Hello World — OpenShift Community Tools (OCT)

> **Community project. Not officially supported by Red Hat.**

A minimal Hello World template for building
[OpenShift Community Tools](https://github.com/openshift-community-tools) console extensions.
Fork this repo to create your own OCT module.

## What it does

- Registers a single route at `/community-tools/management/hello-world`
- Shows the CommunityDisclaimer, template info cards, and links
- Reads `ClusterVersion` to display the cluster's OpenShift version
- Demonstrates all OCT conventions in a minimal codebase

## Quick start

```bash
# Clone and install
git clone https://github.com/openshift-community-tools/oct-hello-world.git
cd oct-hello-world
yarn install

# Build the production bundle
yarn build

# Build the container image
podman build -t quay.io/openshift-community-tools/oct-hello-world:1.0.0-ocp4.22 -f Containerfile .
```

## Deploy to OpenShift

```bash
oc apply -f deploy/install.yaml
oc patch consoles.operator.openshift.io cluster \
  --type=json --patch='[{"op":"add","path":"/spec/plugins/-","value":"oct-hello-world"}]'
```

## Forking for a new extension

1. Rename `oct-hello-world` → `oct-<your-name>` everywhere:
   - `package.json` (`name`, `consolePlugin.name`)
   - `console-extensions.json` (route path and `$codeRef`)
   - `deploy/install.yaml` (Namespace, Deployment, Service, ConsolePlugin)
   - `AGENTS.md`, `README.md`, i18n namespace
2. Update CSS prefix from `hw-` to your own
3. Replace `HelloWorldPage` with your component
4. Add to `oct-storefront/catalog/community.yaml`

## Conventions

| Convention | Value |
| --- | --- |
| Plugin ID | `oct-hello-world` |
| i18n namespace | `plugin__oct-hello-world` |
| CSS prefix | `hw-` |
| PatternFly | 6 (from `@patternfly/react-core`) |
| Image tag | `<semver>-ocp<major.minor>` (e.g. `1.0.0-ocp4.22`) |
| Route | `/community-tools/management/hello-world` |

See `AGENTS.md` for the full specification and `.cursor/rules/` for AI coding conventions.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md): setup, `yarn verify`, testing on your own cluster, the project rules and what maintainers do at release.
