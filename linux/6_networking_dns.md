## DNS
NXDOMAIN - means dns lookup failed  

Add ip to /etc/hosts for dns records  
`$ cat >> /etc/hosts   `  
192.168.1.1  db  
IP  hostname  

To get hostname of machine   
`$ hostname`  

To reduce complexity we can simply add entries to /etc/hosts in one common server called DNS server  
And make sure DNS serve rip remains same all time  

To add dns server  
`$ cat >> /etc/resolv.conf`
nameserver  192.167.8.1 another-ip  

DNS lookup is first done checking in /etc/hosts & then dns server  

`/etc/nsswitch.con`f has priority order of dns lookup  
`$ cat /etc/nsswitch.conf`  
hosts: files dns  - first file then dns  

www.hostname.edu  

Here edu is top level domain  
Hostname is hostname or domain name  
www is sub domain  

If we add search in resolv.conf, ping or any dns lookup will add search term to the hostname  
Ex:   
```
$ cat > /etc/resolv.conf
nameserver 192.456.78.9
search mycompany.com mycompanyprod.com
```

`$ ping web`
`PING web.mycompany.com` <--------- added automatically

## RECORD TYPES
A  hostname to ipv4  
AAAA hostname to ipv6  
CNAME one hostname points to another or multiple hostname  

nslookup can be used for dns lookup. However it doesn’t consider records in /etc/hosts  

## DIG 
dig hostname

## Networking
Connect hosts using a switch via interface on the hosts(virtual or physical interface)  

To see ntwrk interfaces on hosts  
`$ ip link`
`Eth0`  

`$ ip addr` - will display ip for interfaces

`$ ip addr add ip-in-cidr-notation dev interface`  
Ex: ip addr add 192.168.0.112/24 dev eth0 - will connect to switch to host  

`$ ip link set dev interface up/down` - to bring an interface  

`$ netstat -an`  - will print svcs listening on ports and their type

This changes are temp  
To persist add this to `/etc/network/interfaces  `

To talk to different ntwrks we can use router to talk b/w two switches  
The gateway is one kind of device which can ensure switch can talk to router  

To add gateway to hosts so that it can tell switch to send the req to router,   
Do 
`$ ip route add another-ntwrk-cidr-range via gateway-ip`  
Ex: ip route add 192.168.2.0/24 via 192.168.1.1  
Or we can add a default gw to use for any routes the switch isnt aware  
`$ ip route add default via 192.168.2.1`

`$ route` - will display routing info for the host


