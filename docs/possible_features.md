# Possible Features
While working on the project I thought of a handful of additional features that could be done for full loan application service.

## Simple features
- Ability to change the term months from 72
- Tracking of the number of times a loan application has been modified. This might be an indication of an individual trying to game the system.
- Endpoint to get all the loans in process. Another field would be needed to track completed loan applications
- Aging of loan applications because interest rates change

## More involved features
- Put the loan applications in a queue so that the loan decisions can have more servers as needed. This would require storing the load decisions.
- Special rates or perks for prior customers of the service
- Combining of two separate types of loans in a single transaction. Car and Solar.
- Plugable loan decision mechanics. Allowing for handling of different banks or specials. It might also be possible to apply A/B treatments to see if certain loan features provide better acceptance after approval. Example: twice monthly payments versus monthly
