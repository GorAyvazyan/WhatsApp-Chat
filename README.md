# WhatsApp Chat Interface


#### This project is a simple WhatsApp chat interface built using React, Vite, TypeScript, Tailwind CSS, and shadcn/ui. It allows users to send and receive text messages via the GREEN-API service.

### Features

- **Send Messages:**  Users can send text messages to a WhatsApp number.

- **Receive Messages:**  Users can receive messages in real-time.

- **Responsive Design:**  The interface is fully responsive and works on both desktop and mobile devices.

### Technologies Used
- **React:**  A JavaScript library for building user interfaces.

- **Vite:** A fast build tool for modern web development.

- **TypeScript:** A typed superset of JavaScript.

- **Tailwind CSS:** A utility-first CSS framework.

- **shadcn/ui:** A collection of reusable UI components.

- **GREEN-API:** A service for interacting with WhatsApp.

## Getting Started

### Installation

#### Follow these steps to set up and run the project locally.

We use `yarn` as a package manager: [pnpm](https://yarnpkg.com/)

```sh
# Install all dependencies
yarn install
```

#### Commands

```sh
// Run development
yarn dev
```

#### Building

```sh
// Build
yarn build
```

#### Lint and Prettier

```sh
yarn lint
yarn lint:fix
yarn prettier
```

## Conventions and Best Practices

- [Introduction](#introduction)
- [Commits and commit messages](#commits-and-commit-messages)
- [Code Quality](#code-quality)
- [Code Formatting](#code-formatting)
- [Linting](#linting)
- [Code Reviews](#code-reviews)
- [Never push directly to master](#never-push-directly-to-master)

### Introduction

This document contains various conventions and best practices that we strive to adhere.

### Commits and commit messages

#### Conventional Commits

- Commit messages should be stylistically consistent and follow
  [Conventional Commits](https://www.conventionalcommits.org) specification. We have enabled pre-hook which check
  commit, if it suits conventional commit styles.

### Code Quality

#### Code formatting

- We use [prettier](https://prettier.io).
- To make it really convenient and seamless we recommended installing `prettier` as your code editor plugin and set up
  in your IDE settings.
- We are running `eslint | prettier` with scripts mentioned above

### Linting

We use `eslint` to keep our source code clean.

- We have enabled pre-hook which check commit, if it suits eslint styles.

