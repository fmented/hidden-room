#!/bin/sh

podman build -t hidden_room .
podman run -it -p 3000:3000 --name hidden_room_container hidden_room