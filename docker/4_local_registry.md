To run docker registry locally  
`$ docker run -p 5000:5000 -d --name registry registry:latest`  

To push an image to this local registry  
`$ docker image tag img-name ip-of-host-where-registry-container-is-running:5000 `-----> this is only tag existing image  

If you're building an image, you can instead do  
`$ docker build . -t ip-of-host-where-registry-container-is-running:5000/img-name:img-version-tag`  

`$ docker push  ip-of-host-where-registry-container-is-running:5000/img-name`  

To pull this img  
`$ docker pull  ip-of-host-where-registry-container-is-running:5000/img-name`