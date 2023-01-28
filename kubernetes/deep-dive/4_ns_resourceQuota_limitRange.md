## Namespaces
- Bounded Contexts to deploy workloads
- Each namespace can be limited with max resource usage using `Resource Quoata`
  ```yaml
  apiVersion: v1
  kind: ResourceQuota
  metadata: 
    name: compute-quota
    namespace: 
  spec:
    hard:
      pods:
        requests.cpu:
        requests.memory:
        limits.cpu:
        limits.memory:
  ```
- Also for any workload deployed in namespace, we can specify default resource limits, if they don't have it explicitly specified using `LimitRange`