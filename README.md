# NSQ_Example
NSQ multi nodes with Docker example.

start NSQD, NSQD_LOOKUP and ADMIN Portal
Run > docker-compose up -d

Start all 3 Node Servers in different terminal to see messages distribution on console

node server.js
node server2.js
node server3.js

Admin portal to see all NSQ related details
Admin Portal URL: http://127.0.0.1:4171/nodes