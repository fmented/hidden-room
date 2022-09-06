
[![Hidden Room](/static/Logo.svg?raw=true)](https://github.com/fmented/hidden-room)


# Hidden Room

Web-based Anonymous Live Chat App.

## Initial Setup

```bash
# install dependencies
# this is not required if you just want to use container
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
# generate necessary files for deployment
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
For easy deployment it includes tor image builder that is located in tor directory 📁, it will also generate <kbd>docker-compose.yaml</kbd> so it can easily be deployed using <kbd>docker-compose</kbd> or <kbd>podman-compose</kbd>

> when you run
> ```bash
> npm run deploy:prepare
>```
> it will generate <kbd>Dockerfile</kbd>, <kbd>docker.sh</kbd>, <kbd>podman.sh</kbd>, <kbd>docker-compose.yaml</kbd> and <kbd>tor/torrc</kbd>. Check if those files are properly generated.
>
> however if you have either file or directory named <kbd>service</kbd> in tor directory 
> it will also generate <kbd>tor/Dockerfile.custom</kbd> and <kbd>docker-compose.custom.yaml</kbd>
>
> if <kbd>tor/service</kbd> is a directory it will copy the content inside that directory into /var/lib/tor/hidden_room inside tor image, it should contains <kbd>hostname</kbd>, <kbd>hs_ed25519_public_key</kbd>, <kbd>hs_ed25519_secret_key</kbd> files.
>
> and if <kbd>tor/service</kbd> is a file it will try to create custom onion address based on the text inside that file (keep in mind the longer the prefix the more time is required to build tor image, 4 or less characters would be fine). if there is no text inside that file it will use "room" as prefix
>
>
> if everything is ready, simply run
> ```bash
> # docker-compose
> docker-compose up -d
> 
> # podman-compose
> podman-compose up -d
>```
>
> and if you want to use your custom onion address
>
> ```bash
> # docker
> docker-compose -f docker-compose.custom.yaml up -d
>
> # podman
> podman-compose -f docker-compose.custom.yaml up -d
>```
>
> to see your onion address
> ```bash
> # docker
> docker exec tor list-services
>
> # podman
> docker exec tor list-services
>```
>
> check the address using Tor Browser and see if it's running
>
>___