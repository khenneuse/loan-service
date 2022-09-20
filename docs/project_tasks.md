# Task Breakdown

This is a rough task breakdown for the project to track progress toward the first deliverable.

## Task
Create a **small, minimal API prototype** that allows the creation of three entities - Users, Loan Applications, and Offers - and runs them through a decisioning service to output a loan offer or a clearly explained rejection.

Create each of these users, submit and edit a loan application on behalf of each user, and finally, receive a sensible loan decision for each loan application.

## Milestones
### M0 - System setup
- [X] Create skeleton service with Hello, World! endpoint
  - [X] Node project with yarn
  - [X] Create simple server and endpoint
  - [X] Manual test with curl or browser
  - [X] Add linter
- [X] Create git repository with initial push of the code
- [X] Submit to repository
- [X] Create simple unit test

### M1 - Seed data and offer business logic
- [X] Setup Postgres with Docker
- [X] Setup service database
  - [X] Create TypeORM migration to build tables
  - [X] Run migration
  - [X] Create seed data file and script for database
- [X] Create Offer Business Logic
  - [X] Create tests for logic
  - [X] Build business logic
- [X] Create offers endpoints
  - [X] Create DB entities
  - [X] Create Applications Controller and route `POST /applications/{id}/submit`
  - [X] Create Users Controller and route `POST /users/{id}/application/submit`
- [X] Test logic with seed data

### M2 - Add other endpoints
- [ ] Build remaining Users endpoints
  - [ ] `POST /users`
  - [X] `GET /users`
  - [ ] `GET /users/{id}`
- [ ] Build remaining Applications endpoints
  - [ ] `POST /users/{id}/applications`
  - [ ] `PATCH /applications/{id}`
  - [ ] `PATCH /users/{id}/application`
  - [ ] `DELETE /applications/{id}`
  - [ ] `DELETE /users/{id}/application`

### MQ - Clean up items
- [ ] Write up definitions
- [ ] Write up assumptions
- [ ] Write up deployment instructions
- [ ] Write up areas that were punted
- [ ] Write up other features to add
- [ ] Clean up and add to README.md
