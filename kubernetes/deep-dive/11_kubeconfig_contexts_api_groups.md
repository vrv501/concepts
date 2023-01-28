Everytime you make request to kube-api you havre to use client certificate, client-key, server-ca, and address of kube-api

To simplify this we can instead use kubectl command along with kubeconfig file which has this info. By-default kubectl will read `$HOME/.kube/config`

You can override this using --kubeconfig

Kubeconfig file has 4 imp keys

- current-context: string, has defasult context name

- clusters: -- array type, has info about cluster name, address, server-ca

- contexts: -- array type, will tie what user to use with what cluster along with context name, also can specify what default ns to use in the cluster for the curr context

- users: -- array type, has info about user, client-cert, client-key

## API Groups
Find different groups using kube-api:6443/api  
                            /apis

To access the kube-api using authentication do `kubectl proxy`  
It starts aproxy server on ur localhost through which requests to kube-api would be sent  
Then send req to that proxy
curl https://localhost:port

All core apis defined under /api  
All future apis and extended defs will be defined under /apis . These are namespaced  
Under each apis there are lots of resources and each resources has verbs