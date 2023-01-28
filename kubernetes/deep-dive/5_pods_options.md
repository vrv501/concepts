## Other Configurable options for Pods
### SecurityContexts
- Can be added to podSpec or under containers
- However certain properties in securityContext can only be added when present under containers(capabilities etc)
- You can configure the user to run the application in container using securityContexts, along with other options

## ServiceAccounts
- If application in a container needs to talk to kube-api to get info inside cluster, then serviceAccount has to be created for the pod 
- Once cretaed, a unique token associated with the serviceAccount is mounted as projected volume inside the pod which can be used  
  `/var/run/secrets/kubernetes.io/token`
- ServiceAccount is specified in podSpec `serviceAccount: svcAccName`
- By default if no serviceAccount is specified for a pod, defaultToken is mountyed inside the pod which has limited capabilities
- This can be prevented by setting `automountServiceAccountToken` to false in podSpec
- In kubernetes v1.22+ by default when svcAccount is created a token is not autoCreated or set in a secret. However when a pod uses the serviceAccount it will be automounted with a token which is serviceBound, timeExpiry. However if there is some application which needs to read the token then you have to create the token manually for the serviceAccount using `kubectl create token svcAccName`
- You can also created a secret which has annotation `kubernetes.io/service-account.name: svcAccName`. This will prompt kubernetes to add entry to the secret which has a token. This token will be associated with the serviceAccount which can be used. However this token doesn't have timeExpiry

## Resources
- You can configure the resources for a container under pod `spec.containers[i]` as
  ```yaml
  resources:
    requests: # Reserved by kubernetes for the container
      cpu:
      memory:
    limits: # Max usage klimit for that container. Not guaranteed always available for that pod
      cpu:
      memory:
  ```
- Summation of resources for all containers is totalResources for the pod, but for initContainers the totalResourceUsage is maxLimit out of all initContainers because they are executed sequentially
  
## Taints & Tolerations
- Taints can restrict what pods a **node can accept** not which node a pod can select
- Taint Node: `kubectl taint node node-name key=value:taint=effect`
- Taint-effect basically tells the node if any pod whose tolerations dont match the taints, then what to do to that pod
  - NoSchedule: If tolerations dont match the taint, dont schedule the pod. Existing pods aren't affected
  - PreferNoSchedule: Same as NoSchedule however not guaranteed
  - NoExecution: Same as NoSchedule and existing pods are affected
- To add tolerations to pod, add the following under pod spec
  ```yaml
  tolerations:
    - key: taint-key
      value: taint-value
      operator: Equal
      effect: taint-effect
  ```
- You can prevent scheduling of new pods altogether on nodes using. 
`kubectl cordon Node-Name`. Similarly you can undo this by `uncordon`

## NodeSelectors & Affinity
- These govern what node a **pod can select**
- For nodeSelectors, if a node has label under metadata which exactly matches the nodeSelectors for the pod then pod will schedule on that node
  ```yaml
  nodeSelector:
    label-key: label-value
  ```
- However nodeSelectors are a exactMatch, but let's say we need multiple values for a label to be satisified then we use nodeAffinity under pod spec
  ```yaml
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
          - matchExpressions:
            - key: topology.kubernetes.io/zone
              operator: In
              values:
                - antarctica-east1
                - antarctica-west1
  ```
- Here 2 kinds of affinity: 
  - requiredDuringSchedulingIgnoredDuringExecution: If nodes not found matching affinity, they will be in PENDING state
  - preferredDuringSchedulingIgnoredDuringExecution: If nodes not found it will try to schedule anyway
  - However existing pods aren't affected if suddenly labels are changed on a node
- Operator can be: In, Exists
  - In can be used to specify all labels to match
  - Exists, for this we can simply specify the key and check if that label-key exists then schedule. We dont care about values of the labelKey

- Both tolerations & NodeAffinity can be used in conjunction to restrict the where pods can schedule
  - Simply using taints & tolerations cannot guarantee pod is only schedule don a specificNode as pod can be scheduled on node without any taints
  - If we just use nodeSelectors we cannot gurantee only desired pods are running on a node(Ex: a pod with no nodeSelector can get scheduled on undesired nodes)

## Probes
- A pod is said to be ready when
  - Scheduled(Pod is assigned to a node)
  - Initialised (All images are pulled)
  - AllContainersReady (All containers are in runningState)

- However a container simply running doesn’t mean it's ready to listen, there may be cold startTimes which k8s is unaware. To help with this we can use readinessProbe for containers
- 3 types:
  - httpGet
  - tcpSocket:
  - exec:
- Each type can inludeoptions like failureThreshold, periodSeconds, initialDelaySeconds
- Also we can use livenessProbe to determine if runningApp is healthy or nopt and restart if required
- Specified under pod `spec.containers[i]`

## Types of containers
- Sidecar: dependent on appContainer to constitute microservice logic
- Adapter: processing logs to standard format from various microservices for central logging
- Ambassador: outsourced logic from appContainer used to connect to different instances of environment
- initContainers: Just like containers added to spec, they must complete execution first before any of containers can be started. Thses are meant to short lived pods that successfully complete excution. Useful for short lived jobs  like initialising a db, pulling binary/file etc. They are exceuted sequentailly. Have same options as containers
