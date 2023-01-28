## Jobs & CronJobs
- Just like pods but shortLived and completed without restarting
- apiVersion: batch/v1, kind: Job
- Under `spec.containers[i]` we can sepcify `completions` to specify how many times we want to execute that job. The job is executed one-at-a-time
- Kubernetes will continue to execute job until compeltions are met. However hardlimit is backoff times which can also be overridden
- However you can choose to execute completions at the same time using parallelism
- CronJobs are just like jobs except you can specify `schedule` under job spec. Should be a string whos eformat is same as crontab
- Although when completion is specified how many times to execute, job will backoff if job failed backoffLimit times and will not schedule further jobs even if we haven't reached completions. To ensure completions is reached, increase backOffLimit
