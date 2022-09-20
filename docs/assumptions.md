# Assumptions
Like all projects there are some things that needed to be assumed in order to move forward. In a team environment these items would be raised and presented as critical decisions. Once decided they would be documented as why of the decision.
The reasons for not doing the other options would also be noted.
Some of these will also show up as short cuts taken in the implementation

- Rounding of the values was done to two decimal places to represent cents in a dollar
- All values are in dollars and should be thought of as US Dollars
- All uuid inputs are assumed to be correct in format. The database will throw errors if they are not.
- Change the userId for a loan application didn't seem like a valid use case.
- Inputs to the APIs that required more than a URL parameter were done as JSON not form inputs.
- The user creation takes an id as one of the inputs. This was done to allow for seeding the data with the API instead of just SQL. For a service in the wild this would not be done.
