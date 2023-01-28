**Kubernetes Components**:
- api-server (Responding to requests from clients. All cluster activities must happen via api-server) - Only master node
- etcd (Distributed KV datastore maintaining cluster info) - Only master node 
- kubelet (Agent running on all nodes to ensure all the containers are running on its node)
- container-runtime
- controller (Brain behind orchestration. Monitors nodes & containers for disruptions)
- Scheduler (Looks for new containers and schedules them on worker to be deployed)

`$ kubectl cluster-info` - prints ip and ports different components of kubernetes are running. Useful for diagnosis
