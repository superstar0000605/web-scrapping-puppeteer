# Steps to scrape data from the Airbnb website

## You must first install the dependencies and build the project

```bash
yarn install
```

```bash
yarn build
```

## Then you can run the project

```bash
yarn start
```

the output will be in the `output.csv` file

# Options

To view the browser while scraping, you can use the `--no-headless` option (default : hidden)

```bash
yarn start --no-headless
```

To add a delay between each request, you can use the `--delay` option in seconds (default : 1 second)

```bash
yarn start --delay 3
```
