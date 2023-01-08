Docker by-default sets up 3 types of networking:  
1. Bridge(default)
2. Host
3. None
   

To specify network type while running container use --network=bridge,none,host
Bridge - docker has by default created one subnet whose name is bridge, all t containers gets assigned their own ip from this pool  
None - no network  
Host: containers have no ips' they listen directly on host ports.   

To create new network we can do  
`$ docker network create --driver bridge --subnet ip-cidr-notation`

(Ex: 182.14.0.0/24) --gateway sub-net-1st-address(Ex: 182.14.0.1) ntwrk-name(Ex: isolated-subnet-1)  

To list networks use  
`$ docker network ls`  
Inspect container to get ip assigned to the container  

Docker also by-default assigns container name as hostname with ip. So containers can communicate eac other with container-name  

Docker create network namespaces for all containers which create virtual ethernet adapetrs for all containers which in-turn are used while communicating with each-other  
