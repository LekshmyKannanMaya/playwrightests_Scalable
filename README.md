# E2E Automation Scalable

End-to-end automation built with **Playwright + TypeScript**. It runs against the **production** environment and automates the onboarding journey up to the **2FA screen**, where it intentionally stops. The second scenario covers logging in to website using the onboarded customer.E2E tests are very expensive to run, hence negative validations ideally must be covered with tests in the lower layers of test pyramid.

> **Important — production environment:** The production login flow is semi-automated. A human must solve the CAPTCHA manually, and the automation intentionally stops at the 2FA screen. Do not attempt to bypass CAPTCHA or automate security controls.

## Contents

- [Project overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Running tests](#running-tests)
- [To Dos](#ToDos)

## Project overview

This repository contains browser-based end-to-end automation built with Playwright. The production journeys currently described for this project are:

1. An onboarding journey that proceeds to the 2FA screen and intentionally stops there.
2. A login scenario that uses the onboarded customer's account.

CAPTCHA is handled by a person during a headed browser run. The test does not solve or bypass CAPTCHA, and it does not automate the 2FA challenge.


## Prerequisites

- Node.js 20 or later.
- npm (included with Node.js).
- Git.
- A desktop session capable of displaying a browser window for manual CAPTCHA interaction.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the environment

The repository contains an `.env.example` file, copy it:

```bash
cp .env.example .env
```

Open `.env` and provide the values required by the project.

The project information currently identifies `BASE_URL` and `MAILSLURP_API_KEY` as configuration values. Check `.env.example`. Copy the following  into the .env file.

```bash
MAILSLURP_API_KEY= "sk_Lw8qclswMT8jfv4T_HakeckbasfUCRMPYW0fDYQEFvZuLlN65DU0RsLdzQGmLEfUqe0saGu0Z8GLbokWl" 
```

`MAILSLURP_API_KEY` must be supplied through the approved secret-management process. Do not paste it into source code, this README, screenshots, logs, or chat messages.


## Running tests

The npm scripts currently defined in `package.json` are:

| Command | Purpose |
|---|---|
| `npm test` | Runs the Playwright test suite (`npx playwright test`). |
| `npm run test:debug` | Starts Playwright in debug mode (`playwright test --debug`). |
| `npm run report` | Opens the Playwright HTML report (`playwright show-report`). |


## ToDos

* Translation texts: Implement the required translation texts across the application.
* Two-factor authentication (2FA): Validate the complete 2FA flow using a mock to ensure the entire flow works as expected.
* MailSlurp API key management: Store the MailSlurp API key securely using a secrets management solution, such as GitHub Secrets for CI/CD and 1Password for local development. Avoid storing API keys directly in the codebase or configuration files.
* CAPTCHA handling: Remove the CAPTCHA in the TEST/STAGE environments to enable automated end-to-end testing.
* In the current set up, if same test is concurrently executed, the script fails. The current email validation implementation using MailSlurp is minimal. It primarily validates the email verification link received in the inbox and does not perform any complex validation of the generated email content or its associated details.