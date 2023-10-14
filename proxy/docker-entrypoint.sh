#!/usr/bin/sh

pwd
cp nginx.conf /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf

nginx -t
nginx -g 'daemon off;'
/etc/init.d/nginx reload