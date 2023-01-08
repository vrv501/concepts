kubectl apply to update deploymentSpec  

Two kinds of deployment Strategy:  
  - recreate: Scale down replicaCount to 0 & bring new po at the  same time (Basically doesn’t guarantee uptime)
  - rolling (gradual deployment)  

`$ kubectl rollout status deploy deploy-name` -- shows current rolloutStartegy status   
`$ kubectl rollout history deploy deploy-name` -- shows all revisions
When creating/applying changes to deployment manifest use --record with kubectl to have change-clause filled for every revision with this history cmnd  

`$ kubectl rollout undo deploy deploy-name` -- undoes and bsically reverts to previous revision of deployment