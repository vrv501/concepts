### Network Devices
**Hubs**:
- Layer 1 device. Antiquated
- Dumb (Multiport repeater). Basically sent PDU to all ports(broadcast)
- Collisions occur mostly affecting network performance 

**Switches**:
- Layer 2 device
- Smart (Basically frames are sent from one device to another device by inspecting source & destination MAC adddress)
- Since no broadcast, network performance is much better
- Builds up MAC/CAM(Content addressable memory) table to remmeber MAC address of device connected to ports
- Break up collision domains. However collisions can still occur. Use CSMA/CD to mitigate this issue
- Types:
  - Managed (Expensive, have dedicated setups)
  - Unmanaged (Plug-n-Play)

**Wireless Access Point(WAP)**:
- Layer 2 device
- Just provide wireless access for a wired network
- Note: Router is not WAP. WAP just provides wireless access & nothing else

**Routers**:
- Layer 3 device
- Routes traffic for devices in same or different networks
- Uses routing protocols to determine path of packets
- Breakup Broadcast domains

**Modem**:
- Modulate/Demodulate analog to digital signals
- Layer 1 device

## Ethernet
Set of standards enabling LAN. IEEE 802.3

### Cabling
Primarily 3 types
**Co-axial**:
- Antiquated. Mostly cable TV's

**Twisted-Pair**
- Standard ethernet cabling. 
- Two types:
  - Straight through (For connecting different network devices/ports/interfaces)
  - Cross Over (For connecting same network devices/ports/interfaces)
- Most common household cables:
  - cat 5e (100Mbps - 100m, 1Gbps - 55m)
  - cat 6 (1Gbps - 100m)
- Susceptible to cross-talk, Electromagnetic Interference(EMI)
- 
**Fiber**:
- Two types:
  - SingleMode
  - MultiMode
- Very high speeds over loong distances

## Common protocols
Each of these protocols use specific ports as there can exist multiple protocols being used for communication at the same time on a host

**Address Resolution Protocol(ARP)**:
- Finds MAC/physical address using logical/IP address
- Done by broadcast of ARP request over LAN asking for MAC addr for given IP addr
- RARP vice-versa of ARP
- `$ arp -a` prints ARP table in the host device

**Internet Protocol(IP)**:
- For routing packets across multiple networks
- Connection-less
- Each packet follows independent route, and their sequenced combination makes the data
- Routing follows the most efficient path which might not always be the shortest
- Two types:
  - Data packets
  - Route-Update (Used by gateway protocols for finding efficient route)
    - Each router maintains routing table having `network gateway/route/hop-ip`

**Internet Control Management Protocol(ICMP)**:
- Companion to IP. Connection-less
- Useful for error-reporting when routing fails
- Ex: ping, traceroute etc
  
  
  

