`$ dpkg -i debian`  

Pkg manager - verify digital signature of packages  
Install dependencies & updating them  

## RPM
No pkg dependency management  
`$ rpm -ivh pkg.rpm` (install, verbose)  
`$ rpm -Uvh pkg.rpm` (Upgrade, verbose)  
`$ rpm -e pkg.rpm` (remove rpm)  
`$ rpm -qa pkg-name` (quey installed rpm for pkg-name)  
`$ rpm -Vf path-to-file`

## YUM
Has pkg dependency mgmt  
/etc/yum.repos.d has repository info  
Add .repo files here to auto-update for the pkg  

Yum steps - First  transaction check  
 - verify if installed  
 - if not installed, checks the local configured repo-list providing the pkg  
 - then displays the depdnedencies & pkgrpms to be installed and waits for user confirmation  
 - if installed, checks for update and waits for user confirmation   
`$ yum repolist` (Lists repos under .etc.repos.d)  
`$ yum provides pkg-name` - (Reports repo providing the pkg-name)  
`$ yum install/remove/update pkg-name` (if update used without any pkg-name it will update all installed pkgs)  

## DPKG
`$ dpkg -i/-r pkg-name` (install/remove)  
`$ dpkg -l pkg-name` (list installed)  
`$ dpkg -s pkg-name` (status whether installed or not)  
`$ dpkg -p <path to deb>` (display details of pkg before installing)  

## APT
`/etc/apt/sources.list` - repos declared here
`$ apt edit-sources` - edit repos in the above path
`$ apt search pkg-name`

## Archieving
**Disk Usage (du)**
`$ du -sk file-path`(print size of file)
`$ du -sh file-path` (print size in human readable format)
`$ ls -lh file-path`

## TAR Archieve
`$ tar -cf test.tar file1 file2`
                   name-of-tar individual-file-names  
       if we use -zcf with same opts as above, it will reduce size of tar ball  
`$ tar -tf test.tar` - see contents of tar ball  
`$ tar -xf test.tar` to extract tar  file

`$ bzip2 file1`  `$bunzip2 file.bz2`  
`$ gzip file1`    `$ gunzip test1.gz`  
`$ xz file1`        `$ unxz file.xz`
