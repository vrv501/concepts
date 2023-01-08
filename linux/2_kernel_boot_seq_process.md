It is responsible for 4 imp tasks
- Mem mgmt
- Process mgmt/ cpu scheduling
- Device drivers - intermediary b/w hardware & processes
- System calls & security/access
	
`$ uname` ---> os kind  
`$ uname -r` --> kernel version  
`5.4.0-1087-gcp here 5 - kernel version, major version 4`

Kernel does mem mgmt by seperating & running process in two different spaces
- Kernel space - kernel, device drivers - unrestricted access to everything
- User space - all usr installed apps
All process in user space make system call to kernel to access data to/from devices


When usb is attached to devices, device drivers loaded in kernel space send req to dev svc in userspace to create device node & mount devices at a separate mountpoint under /dev


`$ dmesg` - logs from kernel or ring0 buffer, grep can be used to access specific logs ex: usb  
`$ lspci` - list pci devices (which use pcie slot. Ex: raid controller, graphic card etc)

## Storage
`$ lsblk` - list blocks or partitions in disk  
 It has something called MAJ:MIN  
 MAJ - given to a device. Ex: 9 - scsi disk 1 - ram  
 MIN - partition number under the device  

## CPU
`$ lscpu` - cpu arch

## Memory
`$ lsmem`  
`$ free`  
`$ free -m`(in megabytes)`-k`(kilo)`-g`(gb)

## UDEVADM
`$ udevadm monitor` - listens and prints udev events  
`$ udevadm info --query=path --name=/dev/sda5`

## BOOT SEQ
1. BIOS POST - Verify I/O are working
2. Load bootloader from first sector or efi partition of disk(/boot)
3. Bootloader loads kernel of OS into memory & decompresses - Initialize h/w & other devices
4. Loads initd svc(systemd) - mounting file systems, starting system services

To check init  
`$ ls -l /sbin/init`  

`$ runlevel` - Decides boot mode (Graphical, CMDLINE)  
5 - graphical  
3 - multiuser   

`$ systemctl get-default`   
`$ systemctl set-default multi-user.target`

## Runlevvels
0 - poweroff  
1 - rescue  
2,3,4 -  multi-user  
5 - graphical  
6 - reboot 

## Processes
PID = threadID for single threaded process  
PPID (Parent process id) is id of process which spawned sub processes  
`$ kill -SIGKILL PID` or `$ kill -9 pid` will kill the process with id  
Kill only kills process of current us4er. To kill any other user process use sudo   

`$ ps -u`  - display pids for curr user  
`$ ps -ef` - display all processes