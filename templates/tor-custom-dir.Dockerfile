FROM alpine

RUN apk update
RUN apk add tor shadow bash

COPY torrc /etc/tor/torrc
COPY start-services /bin/start-services
COPY list-services /bin/list-services
COPY stop-services /bin/stop-services

RUN chmod +x /bin/start-services
RUN chmod +x /bin/list-services
RUN chmod +x /bin/stop-services

COPY service /var/lib/tor/hidden_room

# Change Tor user to a high UID that's unlikely to conflict with anything on the host
RUN usermod -u 7942 -o tor
RUN chown -R tor /var/lib/tor/hidden_room
RUN chmod -R u+rwX,og-rwx /var/lib/tor/hidden_room

# Remove the shadow package (we only needed it for the usermod command)
RUN apk del shadow

# Runtime settings
USER tor
ENV HOME /var/lib/tor
WORKDIR /var/lib/tor
CMD ["/usr/bin/tor", "-f", "/etc/tor/torrc", "--runasdaemon" ,"0"]