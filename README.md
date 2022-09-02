
[![Hidden Room](/static/Logo.svg?raw=true)](https://github.com/fmented/hidden-room)

<style>
    strong, h1, h2, summary{
        color: #22aaff;
        font-weight: bold;
    }

    strong, summary{
        font-size: 18px;
    }
</style>
# Hidden Room

Web-based Anonymous Live Chat App.

## Initial Setup

```bash
#install dependencies
npm i

# generate server/key.ts
npm run gen
```

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
# build sveltekit
npm run build:app

# build server
npm run build:server

# build both
npm run build
```

## Runing the Server

To run the server

```bash
# run server 
npm run serve
```

## Container

```bash
# generate Dokerfile and scripts
npm run deploy:prepare

```

<details>
    <summary><strong>Docker</strong></summary>

```bash
# add executable permission
chmod +x docker.sh

# run the script
./docker.sh
```
</details>

<details>
    <summary><strong>Podman</strong></summary>

```bash
# add executable permission
chmod +x podman.sh

# run the script
./podman.sh
```

</details>

<br/>

## Deployment
Hidden Room was meant to be a hidden service.
For easy deployment it includes tor image builder that is located in tor directory 📁, it will also generate <kbd>docker-compose.yaml</kbd> so it can easily be deployed using <kbd>docker-compose</kbd>

> when you run
> ```bash
> npm run deploy:prepare
>```
> it will generate <kbd>Dockerfile</kbd>, <kbd>docker.sh</kbd>, <kbd>podman.sh</kbd>,
and <kbd>docker-compose.yaml</kbd> in the root directory. it will also generate <kbd>torrc</kbd> in tor directory. check if those files are created.
>
> if everything is ready, simply run
> ```bash
> docker-compose up -d
>```
>
> to see the onion address
> ```bash
> docker exec tor list-services
>```
>
> check the address using Tor Browser and see if it's running
>
>___