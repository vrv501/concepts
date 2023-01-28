Authentication: Who can access the cluster?
- Usernames & passwords
- Certificates
- LDAP 
- Username, tokens
- ServiceAccounts
  
Authorization: What can they do on the cluster?
- RBAC
- ABAC
 
Communication b/w all components to kube-api is restricted using TLS certs


## Authentication
- Static-pswd file
- Static-token-file
- Identity providers

Create a csv file with columns password, username, userid, groupID
Then when calling kube-api server pass --basic-auth-file=file.csv


Then when making request to kube api specify use curl https://kube-ai:6443 -u username:password

For static file, the first column will be token and then while calling kube-api use --basic-token-file. While calling
Kube-api use curl https://kube-aoi:6443 -H 'Authorization: Bearer token'

Although this is fine for testing, better to use contents in a file in a volume and then mount the volume to kube-api pod

We Can also create a role and then bind that role using rolebindings to a specific user so that when they make curl request, they can only access certain info from the cluster

## Authorization
- Node: Any equests comping to kube-api wuth system:node attribute is given access
- ABAC: All users, groups are given access to resources seperately. Eveytime there's a change, it has to be made in all access groups
- RBAC: Predefined roles are created which has definitions on whataccess & verbs they have. All accessgroups are then binded to these roles. Much simpler & easy to manage access
- Identity providers(Webhook): Externla providers like open policy agent


There are 2 more modes: AlwaysAllow, AlwaysDeny - name explains what they do when received an action to kube-api  
Authorization modes can be chained
--auth-mode=Node, RBAC, Webhook  
Preference is left-to-right as each module denies request
