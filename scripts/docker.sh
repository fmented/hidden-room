#!/bin/sh

docker build -t hidden_room .
docker run -it -p 3000:3000 --name hidden_room_container hidden_room