import {writeFile, readFileSync, existsSync, lstatSync} from 'node:fs';

import {__PROD_HOSTNAME__, __PROD_PORT__} from '../server/settings.js'

const web = readFileSync("templates/web.Dockerfile", {encoding: "utf-8"})
                .replace(/__PROD_PORT__/g, __PROD_PORT__)

const torrc = readFileSync("templates/torrc", {encoding: "utf-8"})
                .replace(/__PROD_PORT__/g, __PROD_PORT__)
                .replace(/__PROD_HOSTNAME__/g, __PROD_HOSTNAME__)


const docker = `#!/bin/sh
docker build -t hidden_room_image .
docker run -d --rm -p ${__PROD_PORT__}:${__PROD_PORT__} --name hidden_room hidden_room_image
`
const podman = docker.replace(/docker/g, 'podman')


const compose = readFileSync("templates/compose.yaml", {encoding: "utf-8"})

const composeCustom = readFileSync("templates/compose-custom.yaml", {encoding: "utf-8"})


const torCustomFilter = function(filter){
    return readFileSync("templates/tor-custom.Dockerfile", {encoding: "utf-8"})
            .replace(/__FILTER__/g , filter == "" ? 'room' : filter)
}

const torCustomDir = readFileSync("templates/tor-custom-dir.Dockerfile", {encoding: "utf-8"})




writeFile('Dockerfile', 
    web, 
    (err)=> {
        if (err) return console.log(err);
        console.log('generating Dockerfile');
});


writeFile('tor/torrc', 
    torrc, 
    (err)=> {
        if (err) return console.log(err);
        console.log('generating tor/torrc');
});


writeFile('docker.sh', 
    docker, 
    (err)=> {
        if (err) return console.log(err);
        console.log('genarating docker.sh');
});

writeFile('podman.sh', 
    podman, 
    (err)=> {
        if (err) return console.log(err);
        console.log('genarating podman.sh');
});

writeFile('docker-compose.yaml', 
    compose, 
    (err)=> {
        if (err) return console.log(err);
        console.log('generating docker-compose.yaml');
});



const customPath = 'tor/service'

const useCustom = existsSync(customPath)
if(useCustom){
    const isDir = lstatSync(customPath).isDirectory()

    if(!isDir){
        const prefix = readFileSync(customPath);
        writeFile('tor/Dockerfile.custom', 
            torCustomFilter(prefix), 
            (err)=> {
                if (err) return console.log(err);
                console.log('generating tor/Dockerfile.custom');
        });
    }

    else{
        writeFile('tor/Dockerfile.custom', 
            torCustomDir, 
            (err)=> {
                if (err) return console.log(err);
                console.log('generating tor/Dockerfile.custom');
        });
    }

    writeFile('docker-compose.custom.yaml', 
    composeCustom, 
    (err)=> {
        if (err) return console.log(err);
        console.log('generating docker-compose.custom.yaml');
    });
}