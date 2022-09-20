# Loan Service
This service does basic loan mechanics for vehicle loans. It implements a series of rules for deciding if a loan application is to be accepted. If the loan is accepted the service will return the details about the loan. This includes the APR and monthly payments for the loan.

- [Project Task Breakdown](docs/project_tasks.md)
- [General Definitions](docs/definitions.md)
- [Assumptions](docs/assumptions.md)
- [Tech Choices](docs/tech_choices.md)
- [Skipped Work](docs/skipped_work.md)
- [Possible Features](docs/possible_features.md)

## Deployment Instructions
This service was built to utilize `docker-compose`. This means that at least the database setup is handled there.

### First Time
There are some basic steps to stand up the service. This includes compilation and all first time run steps
1. `docker-compose up --detach`
1. `yarn`
1. `yarn compile`
1. `yarn migrate`
1. `yarn start`

There is an optional step to seed the database with some initial data. This data lives in [seed-data.sql](sql/seed-data.sql). You can run `yarn seed` after initial setup to load the data.
<span style="color:red;">WARNING:</span> The seeding of data is not idempotent.

### Subsequent Times
The commands are reduced for follow on development after the first round of setup
1. `yarn compile`
1. `yarn start`

