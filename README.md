# Exercise instructions

https://www.notion.so/joinhyphen/Full-stack-engineer-exercise-5ccde379536d47e98fd6cfea63b39ef8

## Exercise Note 

- To run the app locally from the perspective of user1, please add the following env var to `/apps/frontend/.env.local`
```
NEXT_PUBLIC_HASURA_GRAPHQL_API="http://localhost:8080/v1/graphql"
NEXT_PUBLIC_USER1_JWT_TOKEN="<user1_token>"
```

## Future improvement 
- Add more frontend tests
- Improve form accessibility 
- Implement algorithm to generate different number of easy/hard questions for moderate quiz based on total number of questions per quiz

## 🏁 Definition of done - Backend

- [x]  `createQuizQuestions` function implemented
    - [x]  Added tests for all valid inputs
    - [x]  All tests in `apps/backend/actions/create_quiz/createQuizQuestions/test.ts` pass
    
## 🏁 Definition of done - Frontend

### **UI**

- [x]  Resembles the [Figma designs](https://www.figma.com/file/01u1PJtOwHZgfMJk5jtNUd/Full-stack-engineer-exercise) (password: `hyphenexercise`)

### **Welcome screen**

On selecting a difficulty:

- [x]  Sends a `create_quiz` mutation
- [x]  Routes the user to the first question in the quiz

### **Quiz questions screens**

- [x]  Supports a quiz with any number of questions (e.g. if the backend returns 10 questions instead of 5, the frontend should handle it)
- [x]  Supports questions in 3 formats
    - [x]  `text`: if `answer_type` is ‘text’ and `input_options` is NULL
    - [x]  `number`: if `answer_type` is ‘number’ and `input_options` is NULL
    - [x]  `radio`: if `input_options` is not NULL
- [x]  The user’s response to each question is submitted via a `submit_question_response` mutation
- [x]  Questions with a submitted response should be read-only, such that a user cannot submit a new response if they go back to a previous question with the back button
    - The backend will reject submissions for quiz questions which already have responses
- [x]  The user’s progress through a quiz persists, such that the quiz resumes from the latest unanswered question if the session is interrupted or the page is refreshed
    - Hint: the `submit_question_response` mutation is enough to persist each question’s state. Quiz progress can be derived without needing to modify the database schema
    - If the user has multiple active quizzes (i.e. more than one entry in the `quizzes` table where `completed_at` is NULL), the quiz with the most recent `started_at` timestamp should be presented to the user

### **When the user finishes a quiz**

- [x]  The result screen is shown
    - [x]  ‘Start a new quiz’ button returns the user to the welcome screen
- [x]  A `complete_quiz` mutation is sent

### **UI**

- [x]  Resembles the [Figma designs](https://www.figma.com/file/01u1PJtOwHZgfMJk5jtNUd/Full-stack-engineer-exercise) (password: `hyphenexercise`)

## 🏁  Final checks

- [x]  `pnpm typecheck` — should succeed with no type errors
- [x]  `pnpm build` — Next.js app build should succeed
- [x]  `pnpm test` — all tests should pass



---

# Turborepo starter

This is an official pnpm starter turborepo.

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager.

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/core-concepts/pipelines)
- [Caching](https://turborepo.org/docs/core-concepts/caching)
- [Remote Caching](https://turborepo.org/docs/core-concepts/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/core-concepts/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
