# Statefulsets
- Gurantee all pods follow fixed name format
- Guarantee order in which pods are scheduled
- STS needs a headless service configured under spec using serviceName
- Scaling pods is sequential, but scaledown will bring down last Pod and so forth
- This can be overridden using podManagementPolicy: Parallel. This will make sure to bring pods in any order while retaining benefits like known pod names etc
  
## Headless Service
- Headless service is similar to clusterIP however it doesn’t have any ip or does it do any loadbalancing. What it simnply does is create dns records of all pods selected by the service using format: pod-name.headless-service-name.namespace.svc.cluster.local
- You can reach any specific pod behind headless service using pod-name & healdless svc name. Useful for statefulSets
- To create headless service, simply set spec.clusterIP under servcie to None
- Headless service is useful only for statefulsets, but for deployments it doesn’t work since it will set same hostname for all pods

## Storage in STS
- In any workload objects like deploy, sts volumes under spec will make all pods use the same volume. 
- But if you want different replicas to use different volumes we need to create pvc for different pods even tho they belong to the same workload. 
- To do that we use volumeClaimTemplates defined under spec. Move metadata, spec of pvc under array of volumeClaimTemplates
- But differenc here when volumeClaimTemplate is defined and workload is type deploy, then lets say if one of replica goes down and new one comes up it's going to create new pvc & pv instead of using existing pvc & pv
- But for statefulSet, the new pod that comes up will use existing pvc since we know names are going to be same and use same pv

