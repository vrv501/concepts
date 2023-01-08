All nodes should be able to communicate with pods without NAT and vice-versa  
All  pods should be able to communicate with each other without NAT   
All containers in pods should be able to communicate with each other without NAT  

In each node the ip assigned to pods from local subnet should always be different from subnet of other pod  
Basically no two nodes will use same localsubnet(Avoids NAT b/w nodes, pods)  

## Service
NodePort or any svc is created on all nodes even if pod itself is not present on all nodes  
Loadbalancer is same as nodePort except it load balances request to multiple nodes