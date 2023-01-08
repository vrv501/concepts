## Accounts
Useraccount associated with username & uid &gid  
All users are stored in /etc/passwd  
Users can be tied in groups. Groups are in /etc/group  

UID - userid, GID - group id  
If user is not added to any group, then group will be created(same name as username) with same id value as uid  
`$ id username`  
Uid gid groups  

SuperUserAccount uid=0 ---> has unrestricted access to everything including access to all other user accounts ex: root  
SystemAccounts uid < 100 or b/w 500-1000 (Ex: ssh, mail) - no dedicated home directory - created during os installation. These accounts cannot run as superusers
ServiceAccounts ex: nginx. Installed when svcs are installed  

`$ who` - record of all logged in users  
`$ last` - history of all logged in users  


**Switch users**
`$ su -`  
Switch to root user  
`$ su user-name`  
`$ su -c cmnd` - run cmnd - but asks passwd for other user  

Instead use sudo  

Users in /etc/sudoers are allowed for privilige escalation  

/etc/sudoers ---> always use visudo while editing this file  

1st user or group(begin with %)  
2nd field = host (ALL, localhost)  
3rdfield - optional enclosed in brackets (USER:GROUP or USER) - ALL, nginx etc - Whether sudo can be used by 1stfield user or group to execute cmnds as this field user or group  
4thfield=cmnd (defautlt: ALL) - which cmnd can be used NOPASSWD:ALL - means no password required while using sudo  
`%sudo ALL=(ALL:ALL) ALL` - sudo group can execute on all hosts as all users & groups all cmnds  
`Bob ALL=(ALL) /usr/bin shutdown -r now` - bob can execute on all hosts as all users with following cmnd shutdown using sudo  


## User Mgmt
`$ useradd username`
Will create user & group  
Will set shell as in /bin/sh  

`$ passwd` username will set password for user  

More detailed  
`$ useradd -u uid -g gid -d home-dir-path -e expiry-date -G multiple--user-group -s /bin/bash username` - keepinmind home dir will not be created, its just being pointed by -s flag. Here -g is used to gid or primary group id  

`$ userdel username`  

`$ groupadd -g gid group-name`  
`$ groupdel group-name`

