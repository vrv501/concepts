`$ docker run container-image` - Attached mode  
`$ docker run -d container-image` - detached mode  

**Docker List Containers**:  
`$ docker ps` - list running containers & some info  
`$ docker ps -a` -all running & stopped containers  
  - If you like to attach $ docker attach <container-id or container-name> - will give shell session  
`$ docker run -it -d container-image`  - interactive mode and let container run in foreground  

Here -i is interactive mode, -t is pseudo terminal (without -t shell cmnds won't be executed, it will only listen for stdin from user and print stdout from app)  

**Docker stop & remove Containers**:  
`$ docker stop <container-id or container-name>` stop any running container  
`$ docker rm <container-id or container-name>` - removes the container altogether, but not image, multiple id's or names can be given  

**Docker Images**:  
`$ docker images` - list local images  
`$ docker rmi image` - removes image, but there should be no containers using this image  
`$ docker pull image` - just pulls image from registry  

## Docker cmnds
`$ docker run image <cmnd>`  
Ex: docker run ubuntu sleep 5  

To execute a cmnd in already running container  
`$ docker exec <container-name> cmnd`  
Ex: docker exec sleepy-jam cat /etc/resolv.conf  
`$ docker exec -it <container-name> cmnd - interactive session `  

## Inspect & logging
`$ docker inspect <container-id or container-name>` -- will give detailed info including ntwrking & mount points of container  
`$ docker logs <container-id or container-name>`  

## Tags
`$ docker pull image:tag` -- seperated by : , default-tag=latest; latest will be latest version on registry  

## Port forwarding
Every container get assigned internal private IP, which can be accessible within the docker host, but for outsider to access the container, we can port map the container with available host port & use host IP followed by mapped port to access the container outside    
`$ docker run -p host-port:container-port image`  

## Persist data
`$ docker run -v host-path:container-path image` (-v volume)  
The path on host will be mapped to the path inside container, so that even if container gone, data is persisted on the host. Make sure container-path is right  

Do make sure the host path is accessible with read-write permissions for other groups & user as user in container may or may not access the host path (Ex: -u host-user will run process in container as host-user, NOT RECOMMENDED!!)  

## BUILD
`$ docker build . -f Dockerfile -t registry-name-or-docker-username/img-name:tag` -- registry-name or usr-name is optional, but when pushing to registry it's mandatory.  Generally img-name shud be same repo-name in registry  
`$ docker push registry-name-or-docker-username/img-name:tag`  

`$ docker history image` - will give size of each layer & how img was created  
Each layer has changes from previous cmnd.  
By using layers, when at any point build fails, & we correct this & re-build it picks up where the build stopped (layers cached)thereby reducing build-time   

`$ docker run -e VAR1=VAL1 img-name:tag`  

## CMD vs ENTRYPOINT
CMD ["EXECUTABLE", "ARG"]  
 -  In cmd first element in list is always supposed to be executable followed by zero or more args  
Ex:   
CMD ["sleep", 5]  
 - Running this img will run sleep 5  
Now if we run with arg, it will replcae the whole cmd command  
  Ex: docker run img sleep 10   
will resuilt in running sleep 10 even tho we have sleep 5  

ENTRYPOINT ["executable"]  
Now if we run docker run img   
The args specified with docker arg will; be appended to entrypoint  
Sleep 5  

To really make customizable we can have both   

ENTRYPOINT ["sleep"]  
CMD [5]  

$ docker run img -- wil run sleep 5  
But if you run $ docker run img 6 -- it will run sleep 6 (5 is completely ignored)  

If we really want to change entrypoint we can do   
$ docker run --entrypoint executable img args  
Ex: docker run --entrypoint sleep2.0 img 15 -- wil run  sleep2.0 15  
