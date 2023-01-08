## Links
They create entry in container /etc/hosts file  
ip-of-target-container hostname container-id  
Basically to access/talk to the target-container using hostname or container-id  
All containers must be on same bridge network  
Here hostname is similar to container-name (specified using --name)  
`$ docker run --name our-container-name` --link target-container-name:hostname image  

`$ docker run --name redis redis` -------------> Target-container  
`$ docker run --name app --link redis:redis -p 7890:80 voting-app `-----------------> The voting-app will talk to redis container using redis as hostname  

**Docker-compose yaml file**:
Can be used to bring multiple containers associated with an app at the same time  

## Version1
```  
Container-1-name:
  image: <img-name>
  ports:
    - host-port:container-port
  links:
    - target-container-name:hostname (Note if both values either side of : are same, you can simly write as target-container-name)

Container-2-name:
  build: <directory-path-relative to current directory this yaml file is present which contains Dockerfile of this service>
  image: <img-name>
  ports:
    - host-port:container-port
  links:
    - target-container-name:hostname
```
Note: If the service doesn’t have image in registry you can specify build key which basically looks for Dockerfile in that directory and builds the container image  

`$ docker-compose up`  

## Version2
In this version, links support is completely dropped. Which means all containers have their dedicated bridged networking provided in version2  
It also provides support to order of bringing up containers (depends_on)  
```
version: "2"
services:
  container-1-name:
    image: <img-name>
    ports:
      - host-port:container-port
    networks:
      - front-end
  container-2-name:
    image: <img-name>
    ports:
      - host-port:container-port
    environment:
      env-var: env-value
    depends_on:
      - target-container-name (Ex: container-1-name)
    networks:
      - front-end
      - back-end
networks:          -------------> You can isolate specific set of containers to dedicated bridged networking by specifying names 
  - sub-net-1-name(Ex: front-end):
  - sub-net-2-name(Ex: back-end):
```
