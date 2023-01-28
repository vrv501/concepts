## RBAC

If apiGroups field is [""] it refers to all core v1 groups (anything under /api not /apis)  
You can use '*' for unrestricted access. This can be used for verbs, apiGroups, resources  

Create roles bind to these using rolebinding  
Roles are by default namespace scoped  
You can also restrict access to specifc resource belonging to specific apiGroup in a namespace by specifying resourceNames  

To check if you can perform verbs on api-resources do  
`$ kubectl auth can-i  verb api-resource --as user-name -n namespace`

User kubernetes refernce 1page doc for knowing what apiGroups to use  
In roleBindings under roleRef which is assigned to what kind,
kind to use(User, Group, ServiceAccount)

## ClusterRoles
All api-resources can be either namespaced, or cluster wide  

RBAC by default is namespaced scoped  
But lets say we want to provide access to resources while not restricting to namespace or we want to restrict access to cluster wide resources then we can use cluster roles  
`$ kubectl api-resources --namespaced=true/false`

To restrict access to apiResources we can create cluster roles & bimd them using clusterrolebindings  
Cluster roles can be used for cluster wide resources & to get access to resources across all namespaces even tho they are namspaced resources