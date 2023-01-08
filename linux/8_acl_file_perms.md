All users have access to /etc but only root user has write access  

Access control files are in /etc, cannot be modified by text editors  

All passwords are stored in /etc/shadow  

/etc/group - name:passwd:gid:members  
/etc/shadow - username:password:lastchange:minage:maxage:warn:inactive:expdate - if passwd is empty it means it’s not set yet  
/etc/passwd - username:passwd:uid:gid:GECOS:HOME_DIR:SHELL  

**FilePermissions**   
The numbers are octal  
R - 4 W - 2 X - 1  
User permissions have more priority over group permissions  

Alphabetical way  
`$ chmod u[+r+w+x],g[+r+w+x],o[+r+w+x] file-or-directory` - add or remove rwx permissions for user group others  
Ex: $ chmod u+r-wx file - will grant read access to user but remove write & execute  
`$ chmod ugo+r-x file` - for everyone give read access but remove execute access
Numerical way  
`$ chmod 660 file` - rw acess to user group but no acess to others  

**Ownership**
`$ chown user:group file_or_dir` - if group is not provided, only user permission is changed  
`$ chown -R dir` - will change permissions for all files & dir under the specified dir recursively  
`$ chgrp group file`  

Set permissions for specific groups  
`$ setfacl -m g:group-name:rwx /data`  
                   permissions dir  

Set process limit for groups  
`$ vi /etc/security/limits.conf`
`@groupname - nproc number`

Set resource quota limit for group on dir  
`$ mount | grep dir` -> will give mount-point  
`$ setquota -g group-name low-limit hard-limt 0 0 mount-point `  
Ex: setquota -g devs 100M 500M 0 0 /dev/vdb1  

## SCP
Use scp -p to preserver file permissions of a file when transferring
