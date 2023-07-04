# Contributing to the Truth Post

Thank you for your interest in contributing to the Truth Post!
We value your time and effort in helping us create a useful and efficient platform for our users.
Please follow these guidelines to ensure a smooth collaboration and contribution process.

## Table of Contents

- [Code of Conduct](https://github.com/proveuswrong/webapp-news/blob/main/CODE_OF_CONDUCT.md)
- [Getting Started](#getting-started)
- [Codebase Organization](#codebase-organization)
- [Principles](#values)

## Code of Conduct

We expect all contributors to adhere to our Code of Conduct. Please review it before participating in our community.

## Getting Started

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Install the required dependencies by running `yarn`.
4. Start the development server by running `yarn start`.
5. Create a new branch for your changes, following the [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow).

## Codebase Organization

### Source Control
We use [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) strictly. 

Here is a lifecycle of a new feature:

    git checkout develop
    git checkout -b feature_branch
    git add myChanges
    git commit -m "nicely written message"
    new pull request onto develop

### Styling

Use SCSS for targeting elements in general and use CSS Modules for targeting only a single element.
Strive to find common styling rules to be able to put styling rules in global files to avoid duplications.
Follow the SMACSS (Scalable and Modular Architecture for CSS) methodology to organize SCSS files.

To achieve a responsive design, we use [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/) and
a [typographic scale](https://spencermortensen.com/articles/typographic-scale/).
You can pick a font size, color, and spacing size using stylesheets under `src/stylesheets/variables`.

### Components

Try to strip away any logic from the components you create, that maximizes reusability and maintainability. If your component does not
contain logic, perfect, put it under `src/components/presentational` else put it under `src/components/others`.
You can reuse a component from Ant Design or build from scratch. Prefer building from scratch if it's an easy component to minimize dependencies.

## Principles

### Less is More
We aim to construct using the least amount of source code possible, ideally none. We view code as a liability rather than an asset. Therefore, we focus our efforts on precisely defining the problem at hand, rather than expending energy on solving an ambiguously defined issue.

### We Aim for Maintainability
Building software is just the beginning; the true challenge lies in ensuring its longevity. Therefore, we don’t hastily assemble code just to ‘make it functional’. Our objective is to create code that is both maintainable and durable. Simplicity is paramount, as it aids in grasping the underlying mechanisms at any future juncture. We favor clarity and comprehensibility, even if it means not achieving the utmost efficiency. Our goal is to reduce complexity to a minimum. Patience is vital; we take the necessary time to thoughtfully consider and strategize before we begin coding.

### Comments Are Not Welcome
But expressive programming is. Write your statements so that they state what they do, without requiring a comment. If you think your statement needs a comment, very likely you are doing it wrong.

### Keep Dependencies in Check
Resist the urge to introduce a new library each time you implement a new feature. Dependencies create problems in the long run, sometimes they create more problems than they solve. Check if it's really worth introducing a new dependency instead of building yourself. A good rule of thumb is: if you can build it within a day, never introduce a dependency.

### Refactorings > New Feature
Technical debt makes it harder to implement a new feature and each new feature creates a new technical debt. So economically speaking, paying the debt first and then spending is wiser than spending first and then paying the debt. Unless we have a very good reason, we pay the debt first.

## Questions?
In case your question was not covered here, please open up an issue.
