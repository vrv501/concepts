- Borrowing host bits lets us divide a network into number of smaller subnets
- Borrowing bits start from left-to-right
- Two types of subnetting:
  - Fixed-length (Most common - All subnets have same number of host bits)
  - Variable-length  

## Formula
No of host bits borrowed to create x subnets = log<sub>2</sub>x (Assuming number of subnets are multiples of 2)  
No of host bits left = TotalHostBits - BorrowedHostBits  
Block Size = 2<sup>No-of-host-bits-left</sup>  
No of hosts per subnet = BlockSize - 2  
Max host bits that can be borrowed = TotalHostBits - 2

Ex:  
Assume we have one class C network, 192.168.1.0, and I need 4 subnets
So for Class-C, host-bits = 8, netwrk-bits = 24
No of host bits borrowed to create 16 subnets = log<sub>2</sub>4 = 2
Host bits left = 8 - 2 = 6
BlockSize = 2<sup>6</sup> = 64
Hosts-per-subnet = 64 - 2 = 62  
CIDR Notation = network-address/(ntwrk-bits + borrowed-bits)

Subnets:  
192.168.1.0 - 192.168.1.63 - 192.168.1.0/26  
192.168.1.64 - 192.168.1.127 - 192.168.1.64/26  
192.168.1.128 - 192.168.1.191 - 192.168.1.128/26  
192.168.1.192 - 192.168.1.255 - 192.168.1.192/26  

## IPv6
Uses 128 bits or 16 bytes
Represented with 2 bytes at a time (in hexadecimal) followed by :
Ex: AC:CA:04:04:00:0A:0B:FF


