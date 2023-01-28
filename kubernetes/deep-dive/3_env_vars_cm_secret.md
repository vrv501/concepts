## Environment variables
- Can be set in `spec.containers[i]` of deployments, replicaSets  
  ```yaml
  env:
    - name:
      value:
  ``` 

## ConfigMaps
- Key value store
- `kubectl create cm cm-name --from-literal key=value --dry-run=client -o yaml > cm.yml`
- To mount configMap directly as file into pod, use
  ```yaml
  spec:
    volumes:
      - name: vol-name
        configMap:
          name: cm-name
    
    containers:
      - name: container-1
        volumeMounts:
          - name: vol-name
            mountPath: path-inside-container
  ```

- To set keys & values from configMap as env vars inside container set the following values under `pod.spec.containers[i]`
  ```yaml
  env:
    - name: env-var-name
      valueFrom:
        configMapRef:
          name: cm-name
          key: key-inside-cm
  ```

  or to use all keys as env vars inside container set the following values under `pod.spec.containers[i]`
  ```yaml
  envFrom:
    - configMapRef:
        name: cm-name
  ```

## Secrets
- Key-value store except values are base64 encoded
- `kubectl create secret generic secret-name --from-literal key=value --dry-run=client -o yaml > cm.yml` -- values need not be base64 encoded while using imperative commands
- To mount secret into container, use -- Note: Each key is mounted as file, whose content is value
  ```yaml
  spec:
    volumes:
      - name: vol-name
        secret:
          secretName: secret-name
    
    containers:
      - name: container-1
        volumeMounts:
          - name: vol-name
            mountPath: path-inside-container
  ```

- To set keys & values from secret as env vars inside container set the following values under `pod.spec.containers[i]`
  ```yaml
  env:
    - name: env-var-name
      valueFrom:
        secretKeyRef:
          name: secret-name
          key: key-inside-secret
  ```

  or to use all keys as env vars inside container set the following values under `pod.spec.containers[i]`
  ```yaml
  envFrom:
    - secretRef:
        name: secret-name
  ```
- When editing the manifest of secret, always ensure if you're adding new key & values, values are base64 encoded
- Secrets of type "generic" is for KV store, "tls" for storing certificates & keys
