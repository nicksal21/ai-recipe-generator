# AI Recipe Generator

## Purpose

This project was built as a test project to demonstrate familiarity and growing competency with modern cloud-based AI application development.

It serves as a portfolio piece showing experience with:

- React + TypeScript frontend development
- AWS Amplify for hosting and backend integration
- AWS Bedrock for generative AI
- Environment configuration and deployment workflows
- Basic full-stack application structure for AI-powered user interactions

The goal of the project is not to be production-grade or feature-complete, but to show hands-on ability to build, configure, troubleshoot, and deploy an end-to-end AI application.

---

## Overview

The AI Recipe Generator is a web application that takes user-provided ingredients and uses a generative AI model to create a recipe.

### What it does

- Accepts user input such as ingredients or recipe-related prompts
- Sends the request to an AI model through AWS services
- Returns a generated recipe in a readable format
- Displays the recipe in the frontend UI
- Optionally allows the user to download the generated recipe as a text file

### Typical use

A user can enter ingredients such as:

`chicken, rice, peas, carrots, soy sauce`

The app then generates a recipe that may include:

- Recipe title
- Ingredients list
- Step-by-step instructions

### How to use the app

1. Open the deployed app in the browser
2. Enter ingredients or a recipe prompt
3. Submit the form
4. Wait for the AI-generated recipe to appear
5. Download or copy the recipe if desired

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **UI:** AWS Amplify UI React
- **Backend/Hosting:** AWS Amplify Gen 2
- **AI Model Access:** AWS Bedrock
- **Language:** TypeScript

---

## Project Structure

This is a simplified overview of the main parts of the project:

- `src/` – frontend React application
- `amplify/` – Amplify backend definitions and configuration
- `.env` – local environment variables for development
- `amplify_outputs.json` – generated backend output/config after deployment

---

## Requirements

Before running or deploying this project, you should have:

- **Node.js** 20 or newer
- **npm** 10 or newer
- An **AWS account**
- An **Amplify app** configured
- Access to **AWS Bedrock**
- IAM permissions allowing deployment and model invocation

---

## Environment Variables

Create a `.env` file in the project root for local development.

Example:

```env
VITE_AWS_REGION=us-east-1
```

Depending on how the project is configured, you may also need other environment variables. If you are using Amplify-managed auth and backend configuration, many values will come from generated Amplify outputs rather than from manual `.env` entries.

### Important note about secrets

Do **not** hardcode AWS access keys directly into frontend code for a real deployment.

For local experimentation, you may see examples that use values such as:

```env
VITE_AWS_ACCESS_KEY=your_access_key_here
VITE_AWS_SECRET_KEY=your_secret_key_here
```

However, this is **not recommended for production** because frontend environment variables are exposed to the client bundle.

A better approach is to rely on Amplify-managed backend resources, server-side access patterns, or properly scoped IAM roles.

---

## IAM / AWS Requirements

To deploy and run this project successfully, the AWS user or role involved needs permission to use the relevant services.

Typical required permissions include access to:

- **AWS Amplify**
- **AWS CloudFormation**
- **AWS AppSync** (if used)
- **AWS Lambda** (if used in backend resources)
- **Amazon Bedrock**
- **IAM** for creating and passing roles
- **S3** for deployment/build assets
- **CloudWatch Logs** for debugging

### Bedrock-specific access

The account or role must also have permission to invoke the model being used.

For example, permissions may need to allow actions such as:

- `bedrock:InvokeModel`
- `bedrock:InvokeModelWithResponseStream`

You may also need model access enabled in the AWS Console for the specific Bedrock model.

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the frontend locally:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Deployment

This project is designed to be deployed with AWS Amplify.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure AWS / Amplify

Make sure you have:

- access to the target AWS account
- an Amplify app set up
- the correct branch connected if deploying through Amplify Hosting

### 3. Deploy the backend

If using Amplify Gen 2 pipeline deployment, a command like this is used during CI/CD:

```bash
npx ampx pipeline-deploy --branch <branch-name> --app-id <amplify-app-id>
```

In Amplify Hosting, these values are often supplied automatically as environment variables.

### 4. Build the frontend

```bash
npm run build
```

### 5. Deploy through Amplify Hosting

If connected to GitHub through Amplify Hosting:

- push changes to the configured branch
- Amplify will build and deploy automatically

---

## Common Deployment Notes

### TypeScript strictness

This project uses TypeScript compilation during build:

```bash
tsc && vite build
```

That means unused imports or unused variables may cause deployment to fail if strict compiler options are enabled.

For example:

- unused React imports
- unused Amplify client variables
- unused UI components

Before deploying, make sure the project builds locally with:

```bash
npm run build
```

### Bedrock access

If deployment succeeds but generation does not work, check:

- whether Bedrock model access is enabled in the AWS account
- whether the correct region is being used
- whether the IAM role has permission to invoke the model

### Amplify outputs

After backend deployment, Amplify may generate:

- `amplify_outputs.json`

This file is used by the frontend to connect to deployed backend resources.

---

## Example Workflow

1. User opens the app
2. User enters a list of ingredients
3. Frontend sends the request to the configured AI backend
4. AWS Bedrock generates a recipe
5. The generated recipe is returned and displayed in the UI
6. User can read or download the result

---

## Why this project matters

This project demonstrates practical exposure to the workflow of building an AI-powered application, including:

- frontend implementation
- cloud configuration
- environment management
- deployment debugging
- AI model integration

It is intended as a competency/demo project rather than a full production system.

---

## Future Improvements

Possible future enhancements include:

- recipe history / saved results
- improved error handling
- server-side handling of secrets and API access

---

## Author

Nicholas Salazar
