## Deployment Strategies
Blue-green  

Newer version of pods are deployed along with older version, but traffic is not yet sent to newer version  
We perform tests on nwere version & wait for them to pass. Then we simply switch all traffic to newer version.   
Once done, all pods terminated. This is imply done by switching label exposing the service from vOlder -> vNewer  

Canary  

A small count of nwere version is deployed along with older version. Small portion of traffic is sent to new pods. We perform tests on this small count of newre pods(Canary pods)  

If succeded, we terminate old pods& bring new pods. Once done, canary pod is terminated.  

The name of workload object is entirely different in both strategies  

## HELM
Installer for all manifests  

Helm install/upgrade/rollback/uninstall helm-chart-name  

Artifact.hub.io   

`$ helm repo add repo-name url-to-helm-repository`  
Default repo: artifact-hub  
`$ helm repo list -- lists all configured repos`  

`$ helm search repo helm-chart-name`  
`$ helm install release-name chart-name` . Each upgrade to chart is recommonded to have different-release-name  
`$ helm list  -- installed charts`  
`$ helm uninstall release-name`  

To edit values.yaml  
`$ helm pull --untar chart-name`  
`$ ls chart-name`  
`$ vim chart-name/values.yml`  
`$ helm install release-name path-to-chart`
