## Volumes
- Under pod.spec
  ```yaml
  volumes:
    - name: vol-name
      hostpath/awsBlobStorage:
  ```
- Under pod.spec.containers:
  ```yaml
  volumeMounts:
    - name: vol-name(same as above vol-name)
      mountPath: mount-path-inside-container
  ```
- These volumes have to be setup before by a clusteradmin and are expected to be available for that pod
  
## PersistentVolumes
- Volumes available for clusterWide Usage
- Should be created prior so that any workload can use pv
- Under spec we have accessModes:
  - ReadWriteOnce
  - ReadWriteMany
  - ReadOnlyMany

## PersistentVolumeClaims
- If we have multiple pv's available and to choose the best among the bunch we can use pvc
- If multiple pv match, then we can use selectorLables in pvc to only use pv who have labels matching selectorLabels
- If no pv match pvc it will be in pending state, all pv have one-to-one match with pvc. If pv gets matched to a pvc, it will get mounted no other pvc can claim that pv even though the previous pv has some storage left
- If pvc is deleted what happens to pv is determined by `persistentVolumeReclaimPolicy`
  - Retain: it's not deleted and remains with it's data (Can't be claimed by any other pvc)
  - Delete: PV is deleted & data is gone
  - Recycle: PV is not deleted but data is gone and thus can be claimed by any other pvc
- To use pvc first create pvc manifest with pvc-name. Then use pvc name under volumes
- Remember pv has to be accurately defined with how you want to storte, reclaimPolcy, accessModes etc which will determine which pv to use
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
    - name: myfrontend
      image: nginx
      volumeMounts: 
        - mountPath: "/var/www/html"
          name: mypd
  volumes:
    - name: mypd
      persistentVolumeClaim:
        claimName: myclaim
```

## StorageClasses
- Helps for dynamic provisioning  of pv
- Specified in pvc

