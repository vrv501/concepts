V1alpha - No e2e tests, may/maynot be accepted into kubernetes project, not enabled by default, bugs  

V1beta - e2e tests, has been accepted into kubernetes project, minor bugs, enabled by default  

V1 - confomity tests, will be well developed for its lifecycle along with kubernetes, minimal-to-no-bugs, enabled by default  

All api versions must backward compatible b/w different types not within same type(v1beta1 <-> v1alpha1 but v1alpha2 may not work with v1alpha1), but we can specify preferred version so that when new release is done, kubernetes switches to preferred version of the resources  

To move from deprecated version to new version use  
`$ kubectl convert  -f manifest-path --output-version api-version`(Ex: apps/v2)

Kube-api server docs  

--runtime-config=api-group/revision=true|false