#!/bin/bash

case $1 in 
    heroku)
    npm test -- -npm test -- --params.host=sos1718-09.herokuapp.com/#!/spanUnivStats --params.port=80
    ;;
    *)
    npm test
    ;;
esac
