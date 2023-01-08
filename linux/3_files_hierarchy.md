Everything in linux is file
 - regular files
 - directory
 - special files --- character files (located under /dev for I/O)  
                           - block files (UNDER /dev FOR BLOCK DEVICES)  
                           - links - soft & hard  
                           - socket files (communication b/w diff process)  
                           - named pipes (unidirection flow of data where one process is i/p to other process)  

**Hard links**: Deleting one deletes the other (Two independent files sharing same data)
**Soft link** or symbolic link - points to a file. Deleting soft link doesn’t delete the original file  

To check file type  
`$ file filename`
Displays file-type  

`$ ln -s file softlink`

`$ ls -ld path` - displays all directories in the path   
`drwx-wx-wrx path`

Here first letter shows file type  
d -  directory  
l - symlink  
s - socket  
p - pipe  
c - character  
\- - regular  
b - block  

## Hierarchy
3rd part programs - `/opt`  
`/mnt` - temp mount file systems  
`/tmp` tmp data  
`/media` - all external media (like usb, hard-drive)  

`$ df -hP` (disk file) - list all disk file systems

`/dev` - character files for devices like mnk  
`/bin` system programs  
`/etc` - config files for linix  
`/lib` - shared libraries for diff programs  
`/usr` - user generated programs  
`/var` - log file, cache data  
