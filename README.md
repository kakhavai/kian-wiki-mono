# My Project: A Personal Website Resume and ML Sports Playground

Welcome to my project! This repository serves as both my personal website resume and a fun, experimental playground for machine learning (ML) projects centered around sports. It's structured as a mono-repo, which means it contains multiple sub-projects in a single repository.

## Getting Started

To get started with this project on your machine, follow these steps:

### Prerequisites

- Ensure you have Node.js installed. This project uses `.nvmrc` to specify the Node.js version, so it's recommended to use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage Node.js versions.
- This project uses `lerna` to manage multiple packages. Ideally you should have `lerna` installed globally:

### Setup

1. **Install Node.js**:

- Use NVM to install and use the Node.js version specified in `.nvmrc`:
  ```
  nvm install
  nvm use
  ```

2. **Install Dependencies**:

- Install all required dependencies:
  ```
  npm install
  ```

3. **Run Linting**:

- To ensure code quality, run the linting scripts:
  ```
  npm run lint
  ```

4. **Build the Project**:

- Compile the project using `lerna`:
  ```
  lerna run build
  ```

5. **Run Tests**:

- Execute the tests to verify everything is working:
  ```
  lerna run test
  ```

Enjoy exploring and contributing to my project!
