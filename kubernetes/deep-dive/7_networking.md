## Services
- Three types:
  - ClusterIP: Inside cluster
  - NodePort: Access service outside the cluster using one of nodePort
  - LoadBalancer/ExternalIP: SpecialKind of NodePort. One singleIP so that it will balanced across all nodes
- `kubectl expose deploy/rs/pod deploy/rs/pod-name --type svc-type --port portNum --target-port target-port` - This will automatically take care of adding selectors to identiofy the pods

## Ingresses
- If say we want https, loadBalancing routes to the same pods across different paths, then we can sue ingresses. For this to work we need to deploy nginx ingress controller

## NetworkPolicies
- We can configure Ingress(Incoming), Egress(Outgoing) traffic on a pod using networkPolicies
- Use podSelectors to identify which pods traffic should we control
- Under ingress/egress rules specify selectors for pods from which we can expect/restrict traffic from
- By default pod selectors are only within same namespace
- So if we want to select pods from other namespace Namespace selectors can also be used
- Both podselectors, namespace selectors can be in same array element. If they are used as different elements then it will be 2 seperate rules
  - Traffic from specific pods witrhin same namespace
  - Traffic from all pods in other namespacve
- Ip address filters can also be used