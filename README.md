## Installation

Clone the repo locally:

```sh
git clone https://github.com/smartcrash/olive.git
cd olive
```

Install PHP dependencies:

```sh
composer install
```

Install NPM dependencies:

```sh
npm ci
```

Build assets:

```sh
npm run build
```

Setup configuration:

```sh
cp .env.example .env
```

Generate application key:

```sh
php artisan key:generate
```

Run database migrations:

```sh
php artisan migrate
```

Run the dev server (the output will give the address):

```sh
php artisan serve
```

You're ready to go! Visit [http://localhost:8000]() in your browser.


## Running tests

```ts
throw new NotImplementedException()
```
