- Leading bit denotes the first binary bit from left in an IPV4 address
- Network address(Usually the first IP) and broadcast address(Usually the last IP) are excluded from the IP pool as they are used for special purpose
- Network address is used to identify the network and broadcast address is useful as any packet sent to this IP will be braodcasted to all the hosts on the network
  
| Class | Leading bits(binary) | Network bits | Host bits | Default subnet mask | Total Networks (2<sup>(network_bits - leading_bits_count)</sup>) | Total Hosts/Network (2<sup>host_bits</sup> - 2)|
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | 
| A | 0 | 8 | 24 | 255.0.0.0| 2<sup>7</sup>| 2<sup>24</sup> - 2 |
| B | 10 | 16 | 16 | 255.255.0.0| 2<sup>14</sup>| 2<sup>16</sup> - 2 |
| C | 110 | 24 | 8 | 255.255.255.0| 2<sup>21</sup>| 2<sup>8</sup> - 2 |

**CIDR Notation**
- Another way of representing subnet mask
- To the network address add `/network-bits`  
  Ex: 192.168.0.0/24

**Private IP range**
- Following networks can be used for assigning private IP's(Provided by IANA)  
Class A: 10.0.0.0/8  
Class B: (172.16.0.0 - 172.31.0.0)/16  
Class C: (192.168.0.0 - 192.168.255.0)/24  

**LoopBack Address**:
- Host's own address. Assigned by OS
- Any packet sent will not go over the network or (NIC)interface. It's instead routed back to the OS itself
- Useful for diagnosis of TCP/IP of OS
- Reserved IP range: `127.0.0.0` - `127.255.255.255`. Ignore first & last IP as they are reserved. Any packet sent to the rest of IP's will simply route back to the host OS itself