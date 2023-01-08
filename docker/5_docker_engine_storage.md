Docker engine consists of 3 components:  
1. Docker daemon
2. REST API docker server
3. Docker CLI (optional) this can be present on any another host
	 -- docker cli talks to docker daemon running on same/remote host using REST API  
	To talk to remote host via docker cli use  
	`$ docker run -H remote-ip:port-which-rest-api-listens image`  
	
Docker runs containers by isolating them in their own namespaces   
One such isolation technique of namespace is using PID  
To be clear, docker containers are nothing but just another service running any native linux host  
Just like any other service each container or process gets its own PID  
However inside the container if we check the service it’s assigned it’s own PID since conatienrs are running their own service in a base-img  

All containers can use all the resources just like any process on the host. To restrict this behavior, docker use cgroups to decide how much each container can utilize resources  

`$ docker run --cpus 0.5 img`
`$ docker run --memory 100m img`

## Storage

Docker stores all its files under /var/lib/docker on linux host  
Under /var/lib/docker we have aufs, containers, images, volumes  

-- All container files under containers, Images are stored in images, Any volumes created by containers under volumes etc  
All images are basically layers in Dockerfile line, each layer is cached so that builds happen quickly.  

## COPY-ON-WRITE

Now when you run a container what's actually happening is docker image which is used to spin up the container is present in read-only mode. Docker creates one r/w app layer on top of this image where app data is written. Once container is destroyed, so does this layer however underlying image layers are still present. If you spin up multiple containers with same image, they all are basically using the read only layers of image with each container having their own unique app layers on top of it. Even if you try to change files present in read only layer they are basically copied on tot this app layer while original layers are unaffected. This is called copy-on-write  

Layers are nothing but just another directories. You can view each layer of an image as directory under /var/lib/docker/overlay2/layer-id  

If at any point in Dockerfile changes, steps above it are cached and reused, but steps below it are all recreated & new layers are created  

## Volumes
2 types: volume mount, bind mount (To persist data from app layer we can use volumes)  


Docker uses storage-drivers for maintaining layers, creating/mounting volumes etc
Ex: overlay2, btrfs, aufs etc  

**VolumeMount**:  
`$ docker volume create volume-name`
`$ docker run -v volume-name:path-in-container img` (Even if you don’t create volume before, docker will automatically do it for you)  

This volume will present in /var/lib/docker/volumes  

**BindMount**:  
This can be used to store data from container under any path in docker host
`$ docker run -v path-in-docer-host:path-in-container img`

-v is deprecated instead use, --mount type=bind/volume,source=source-path-or-vol-name,target=path-in-container  
Ex: 
`$ docker run \
--mount type=bind,source=/data,target=/var/lib/mysql mysql:latest`


Since images are basically layers size of image isnt actual size of image on disk its just size of image  
This is because images can share layers so multiple versions can be present for single image can be present. However they only consume minimal space.   

To see the unique & shared sizes& total break down of different docker components storage use  
`$ docker system df -v`