## Pods
- Literally the smallest entity that runs in kubernetes cluster
- Can contain or run more than one container
- `kubectl run pod-name --image image-name`
- To force edit a pod, do 
  - `kubectl edit po pod-name` and then save changes. You will get an error that spec can't be changed at run-time
  - Quit the editor which will save temporary copy of manifest with updated changes under `/tmp`
  - `kubectl replace --forc -f path-to-tmp-manifest`

## ReplicaSets
- Pods themselves are intelligent enough to restart containers when the sole process present inside exit(This behavior can be configued with `restartPolicy`)
- However when pods altogether are stopped due to other issues like resource crunch, node availability, existing node going down they will bo tbe scheduled unless they are monitored by a controller
- RepliaSet achieves this by monitoring pods using selectorLabels and ensure replicas of pods are in runnin state
- `kubectl create rs rs-name --image image-name --replicas replica-number`

## Deployments
- Support rolling out various versions of workloads
- Help update podSpec & maintain replicas on the fly
- `kubectl create deploy deploy-name --replicas replica-number --image image-name`
- In deployment manifest, you can set `spec.containers[i].command` -- overrides entrypoint of Dockerfile or `spec.containers[i].args` overrides CMD of dockerfile. Both must be **array of strings** only 

## Editing manifests
- `kubectl get po -o yaml > po.yml`
- `kubectl create deploy deploy-name --image image-name --dry-run=client -o yaml > deploy.yml`