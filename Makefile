install:
	@ npm i

clean-install:
	@ npm ci

lint:
	@ npx eslint .

test:
	@ npm run test

test-coverage:
	@ npm run test-coverage

publish:
	@ npm link