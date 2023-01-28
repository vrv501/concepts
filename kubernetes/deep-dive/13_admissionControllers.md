## Admission Controllers

- They are for enforcing  certain rules & startegies in manifests of api resources. Not something provided by RBAC or authentication  

- They help us validate manifests, better implement security measures in manifests, do certain operations to automate admission of workloads etc  
Ex: ensuring we don’t use public registreis, ensuring probes are defined on workloads etc

- To see what admissions plugins are defined do  
`$ kube-apiserver -h | grep enable-admission-plugins`  
or check the pod manifest for kube-api for term "admission-plugins"

- You can also disable admission plugins by specifying `dismiss-admission-plugins` along with admission controllers to disable

Types of admission Controllers:
- Validating: Just allow/deny manifests
- Mutating: Add/change manifest
- Both

- First mutating admission controlers are invoked, then validating

- We can create our own admission controllers using validating/mutating webhooks
	1. Deploy our webhook server as a pod in the cluster which has logic to do either or both mutation & validation. Expose it via clusterIP service
	2. Create validating/mutating webhhok manifest which has info to point to the webhook server. Also specify rules on when to invoke this webhook based on apiGroups, version, operation, resources etc

- This webhook would then be used along with admission controllers
	
