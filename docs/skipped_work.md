# Skipped Work
This service is a prototype. Well maybe a bit more than a prototype based on what was built. Because of the push to create a minimal viable example that meets the requirements laid out in the [task definition](./project_tasks.md#task) there was plenty of things that didn't make the cut.
This list could easily be prioritized into further milestones of work depending on what was critical moving forward.
(And yes I spent far more time than I should have building this _prototype_)

## General Functionality
### Missing endpoints
2022-09-25: updated in branch v1-upgrades
There were two endpoints that I decided not to implement. My reason for not doing them is that they were repeats of the other two endpoints that are from the loan applications side. They are:
- `PATCH /users/{id}/application`
- `DELETE /users/{id}/application`
To implement these I would want to extract the logic for doing the application versions into another layer of code. Some use the term _Service Layer_ but that doesn't sound right to me. I have also heard them called _Actions_. They are just business logic.

### Integration tests
[See definition](definitions.md)
These types of test are critical to make sure you don't break the interaction between the layers. They also provide a way to smoke test a service.
If you test from the business layer down, you can get great coverage. Testing the REST API itself, becomes more brittle. Having a client for the service can help reduce the coupling callers may have to your service. Clients can also provide validation and sanity to data like Dates. (Dates are difficult because they look the same as a Date or as a string in JSON)

### Repeated Code
As noted with the [missing endpoints](#missing-endpoints), there is plenty of duplication happening in the code.  Much of it is trivial checking of responses from lookups in the database.
Many seem to favor throwing exceptions when something shouldn't be. I tried to keep it so that sensible 400 errors were returned.
For some time I have wanted to apply the use of the functional programming concept of `Either` to the code so that the error checks were reduced.
This is possible, though it also seems like it might cause more issues with readability. 🤷🏻‍♂️

### Business logic abstraction
A ripe refactor. Pushing the using the TypeORM repository down a layer, or two, so that you work with objects that are only data would be helpful and make the controllers far more readable.
It is a bad practice to have the business logic in the controllers. By having it in a separate layer you can change the API to your service. Example: you can have both gRPC with protobuf and GraphQL if you like.
The probable layout would be to have the business logic call Data Access Objects that then interact with the TypeORM entities. TypeORM has some of this behavior if you dig a bit. It would have been even more magic in the code.
The closest you can see to business logic is the LoanDecision file. This was critical to pull out. It made it testable and since it is the heart of the service I felt it critical to build the tests there.

### Storing of loan decisions
A simple table could have been created to store the loan decisions when they were made. This was skipped as the decision logic is short enough to rerun each time.
Not storing the decisions does have the advantage that you do not need to worry about changes in the loan application invalidating the decision.
The interaction between loan applications and stored loan decisions could lead to trying to store the history. That would need to be considered carefully before doing. A _simple_ table tracking changes can work though it needs to be balanced against the amount of changes that could occur.

### Configuration for environments
To that the prototype done I chose to skip configuration.  This meant hard-coding fields for the database and the server port.  There are some options for libraries like `config` and `dotenv`

### Relations specified in ORM and/or DB
Both ORMs and databases allow for the specifying of the relations between entities.
In the database it can protect you from improper setup. Though it seems to be ignored by many developers.
Maybe it is because you have to remove the records in a specific order if you want to clean them up. Or utilize `CASCADE`. Maybe it causes issues with migrations and we prefer to be a bit more loose in our data.
For ORMs the relations can be helpful if you want to use the extra functionality for joins. This can lead to complicated code and more black box queries being run.
I have seen the joins make it easy to put data together but create performance problems from the joins.
Lately I have personally moved to small queries that look up one item and avoid joins. It allows for moving the data out of the database and into another service or to another storage medium like Dynamo DB. The performance can get a bump because it is not deserializing the data in the joins and trying to make sense of it.
All are points to discuss in a team setting.

### Database transactions
For a prototype this is an easy thing to skip. Currently the code has single writes so transactions are not needed.  In more robust code you should setup up transactions even in the single write cases. This is because it is too easy to forget later when adding another database write. Correcting the corrupt data later can be dreadful.
## Critical for production
### Authentication and Authorization
I saw several examples of how to _quickly_ add AuthN to a service. AuthN and AuthZ need to be thought out and not just thrown on to a service.

### Docker builds and deployment
There isn't a lot of work to bundle and create Docker images that could be pushed to a production environment the key is that the process is repeatable.
Docker helps with this but tooling for this would need to be built to avoid issues.
A series of tests should also be run against the built image before it is deployed

### CI/CD pipeline
These have gotten easier over the years and quickly pay for themselves.
There are plenty of choices and it likely comes to pricing that fits the use case

### Monitoring of the service in production
Service health and metrics need to be built for a release.  The can later be shaped into metrics for the business to track.
For this service a good business metric might be loan applications rejected compared to loan applications processed per unit of time. It could flag the business to changes in clients or a signal that a sales funnel is not performing as expected.
The health of the service is in development's world. It needs to be done to maintain the business and look for issues that can arise.

### Proper logging
console.log is quick and dirty. It doesn't provide information about timing that can be pushed out to other servers for investigation. There are a few frameworks like Winston and Morgan that can shape the messages.
The message isn't as important as getting it someplace searchable. That is infrastructure that takes time.

### Encryption of personally identifiable information
We live in a world of PII problems. The fact that there is data for loans makes it a target. Trying to do this in a way that is secure and does not create problems is hard.
As a company grows this becomes more of an issue. Mostly because of SOX compliance.

## Nice to haves
### Test coverage
Good to know where you might have some holes
