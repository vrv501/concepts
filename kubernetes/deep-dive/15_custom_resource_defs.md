To create our custom resources we need to first define crd and then create actual resource  
To create cr definition,  
```yaml
apiVersion: apiextensions.k8s.io/v1
Kind:CustomResourceDefinition
Metadata:
  name: plural-name.groupName.com (ex: Traintickets.tickets.com) 
Spec:
  scope: Namespaced(cluster resource or namespaced)
  group: apiVersion-when-creating-cr/version(Ex: tickets.com/version)
Names:
  kind: Kind-when-creating-cr(Ex: TrainTicket)
  singular: trainticket
  plural: traintickets
  shortNames:
    - tt
Versions:
  - name: v1
    served: true (for enabling/disabling this version)
    storage: true (preferreedVesrion)
Schema:
  openAPIV3Schema:
      type: object
      properties:
        from: 
          type: string
        to:
          type: string
        number:
          type: integer
          max:1
          min: 0
```

We can also build custom controller to take certain actions when cr are created. Without any controller any cr created is simply stored in etcd  

Deploy CRD + Custom controller  
Operatorhub.io -- operators  