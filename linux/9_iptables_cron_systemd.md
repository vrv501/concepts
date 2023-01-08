## IPTABLES
`$ sudo iptables -L` - show default rules  

Rules are sequential(top to bottom) in iptables, so order of chain matters  
-A ad rule  
-p protocol  
-s source  
-d destination  
--dport destination port  
-j action to take  

`$ iptables -A INPUT -p tcp -s 1233.456.78.67 --dport 22 -j ACCEPT
             -I OUTPUT`  
-A will add to the bottom of table, -I add will add to top of table  

`$ iptables -D OUTPUT 5` - delete 5 th output rule  

`32768 - 60999` - ephemeral port range  

## CRONJOB
`$ crontab -e`  
Open cron file and add creonjob at bottom  
Minute hour day month weekday cmnd  
`$ crontab -l` - will list cronjobs in crontab  
To check cronjob execution   
`$ cat /var/log/syslog | grep -i cron`

## SYSTEMD
`/etc/systemd/service/name.service` - systemd unit file  
```
[Unit]
Description=description about svc
Documentaion=doc url
After=postgressql.service - Any systemd svc to lookout and start only when it suceeds

[Service]
ExecStart=/bin/bash shell-script-abs-path
User=svc-acc-or-user-name
Restart=on-failure - autorestarts
RestartSec=10 - interval to restart on every consecutive failure

[Install]
WantedBy=graphical.target    --> runlevel
```  

SYTEMD LOGS are automaticaLly done by systemd in syslog  

`$ systemctl daemon-reload`  
`$ systemctl edit name.service` --full - if done, no need daemon-reload or reload  
`$ systemctl list-units --all` - will show all svcs
  if --all is ignored, only shows active units  
`$ systemctl start/stop/enable/disable/restart/reload name.service `  


`$ journalctl used to give logs from systemd services`  

`$ journalctl -b -u name.service - will show logs from current boot session for name.service`

