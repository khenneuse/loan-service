# Technical Choices
## Node.js
Rather than trying to learn Ruby on Rails or Python Flask I chose to stick with my more recent experience. This wasn't so bad for the general startup of the service. It did make me wonder though about other tooling that might have been easier.

## Typescript
Again, the is the language I have been working in as of late. It has proven to be fairly quick to build out code in. There are always times when the types get in your way. They can be frustrating to dig through to solve.
One should avoid the escape hatch of `any` as it will burn you later.

## Postgres
The last of the relational databases that is open-source and can handle scale. After you get used to using the command line interface it isn't so bad.
There are GUIs that can help though you lose some of the knowledge like, is the field stored in UTC or not. Once you know about `timestamp with timezone` you can avoid that sharp edge.

## TypeORM
This is a choice I would have to revisit. I have been using it lately and found that a lot can be hidden away and become magic in the implementation.
The use of TypeORM created a considerable time suck that was more about finding the proper incantations over actually getting work done. It also has an unfortunate amount ways that it can be used meaning it is more like an implementation of Perl where everyone has their preferred syntax.
You will note that I chose a 0.2 version over a 0.3 version. Much of this was in trying to avoid having to figure out all the changes that were made so that the file `ormconfig.json` no longer was in use.

## Jest for tests
Jest has proven to be a more complete package for testing. So far the only issue that I have had with the framework is memory. When you run into memory issues it becomes hard to find where the problems are.
Much of the internet talks about it like it is not a problem with Jest and things that you are doing wrong that has the leaks. I am not fond of that attitude for development of frameworks. It seems like some helpful tooling would go a long way.
The other option for this would be Mocha/Chai/Sinon. They work. Just keep up with the changes on them or you will suffer.

## Docker Compose
This was a bit of a first for me. I have used the tool some and have seen it used for building out end to end testing infrastructure.
What it did provide was an easy setup where I could avoid scripting the startup of Postgres.
It is something I want to learn more about and see if it can replace a lot of the scripting that is just related to standing up different Docker containers.
I know it can replace the scripting but at what cost.
