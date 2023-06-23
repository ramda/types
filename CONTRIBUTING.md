# Contributing

1.  Fork the project and clone your fork.

1.  Create a local feature branch:

        $ git checkout -b <branch>

1.  If updating a type, add tests along with it

1.  Make one or more atomic commits. Each commit should have a descriptive
    commit message, wrapped at 72 characters.

1.  Run `npm install` to install needed local dependencies.

1.  Run `npm run build` first, then `npm run test` and `npm run lint` and address any errors. Preferably, fix commits in place
    using `git rebase` or `git commit --amend` to make the changes easier to
    review and to keep the history tidy.

1.  Push to your fork:

        $ git push origin <branch>

1.  Open a pull request.

TODO: Explain the convention for creating types for ramda
