# NestJS + Drizzle + Auth0 template

## Setup
Node version 22.14.0
```bash
$ yarn install
```
## Database
Postgres is being used 

### ORM
We use [Drizzle](https://orm.drizzle.team/) as ORM

## Project Guidelines

### Development Guidelines

#### Unit Testing

Unit tests should be written for all services, controllers, validators and utility functions. The tests should be placed
in the `test` directory, following the same directory structure as the `src` directory. The test files should have the
same name as the module being tested, with the `.spec.ts` extension.

For example, if testing the `src/service/auth.service.ts` file, the test file should be named `auth.service.spec.ts` and
placed in the `test/service` directory.

To run the unit tests, use the following command:

```
npm run test
```

#### Accessing Environment Variables

Environment variables should be accessed exclusively via the `ConfigService` provided by NestJS.
This ensures that all configuration values are managed consistently.

Example usage:

```typescript
import { ConfigService } from '@nestjs/config';
import { Config, SpecificConfig } from 'src/types';

@Injectable()
export class SomeService {
   constructor(private configService: ConfigService<Config>) {
      const someValue = this.configService.get<SpecificConfig>('specificKey');
   }
}
```

### Branching Guidelines

This project follows the GitFlow branching model with some modifications. Here are the guidelines:

- `main`: This is the main branch where the source code of HEAD always reflects a production-ready state.
  Direct pushes to this branch are not allowed.
- `development`: This is the branch where the source code of HEAD always reflects a state with the latest delivered
  development changes for the next release.
  Direct pushes to this branch are not allowed.
- `feature`: These are branches used to develop new features for the upcoming or a distant future release.
  The essence of a feature branch is that it exists as long as the feature is in development, but will eventually be
  merged back into development. Feature branches should be named as `feature/{issue-code}`.
- `bugfix`: These branches are used to resolve non-critical bugs found in the development branch.
  Once the bug is fixed, these branches are merged back into the development branch. Bugfix branches should be named as
  `bugfix/{issue-code}`.
- `hotfix`: These branches are created to address urgent issues that arise in the live production version of the
  software.
  These issues are typically critical bugs that need to be resolved immediately to prevent disruption of service.
  Hotfix branches should be named as `hotfix/{issue-code}`.

When merging to `development`, always use the `Squash and Merge` feature to keep the commit history clean.
However, when merging to `main`, do not use the `Squash and Merge` feature to preserve the full detailed history of
changes.

#### Migrations Guide
To create or edit tables first we need to...
- Update the schema on ./src/database/schema.
- Run `$ yarn db:generate` to create migrations files in ./drizzle/
- Run `$ yarn db:migrate` to apply changes in database