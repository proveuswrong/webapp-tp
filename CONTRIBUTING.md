# Contributing to the Truth Post (Incomplete)

Thank you for your interest in contributing to the Truth Post!
We value your time and effort in helping us create a useful and efficient platform for our users.
Please follow these guidelines to ensure a smooth collaboration and contribution process.

## Table of Contents

- [Code of Conduct](https://github.com/proveuswrong/webapp-news/blob/main/CODE_OF_CONDUCT.md)
- [Getting Started](#getting-started)
- [Codebase Organization](#codebase-organization)

## Code of Conduct

We expect all contributors to adhere to our Code of Conduct. Please review it before participating in our community.

## Getting Started

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Install the required dependencies by running `yarn`.
4. Start the development server by running `yarn start`.
5. Create a new branch for your changes, following the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow).

## Codebase Organization

### Styling

Use SCSS for targeting elements in general and use CSS Modules for targeting only a single element.
Strive to find common styling rules to be able to put styling rules in global files to avoid duplications.
Follow the SMACSS (Scalable and Modular Architecture for CSS) methodology to organize SCSS files.

To achieve a responsive design, we use [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/) and
a [typographic scale](https://spencermortensen.com/articles/typographic-scale/).
You can pick a font size, color and spacing size using stylesheets under `src/stylesheets/variables`.

### Components

Try to strip away any logic from the components you create, that maximizes reusability and maintainability. If your component does not
contain logic, perfect, put it under `src/components/ui` else put it under `src/components`.
If you need help building it, you can reuse a component from Ant Design. Prefer to not though, especially if the component is an easy one.
The less we depend on a library the better.
