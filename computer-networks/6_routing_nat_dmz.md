- There are layer3 switches which can help route between multiple VLAN'S

**Port mirroring**:
Setup dedicated port on switch to receive all the traffic. Useful for monitoring, diagnosis etc

**Firewalls**:
- Setup ACL rules to deny/allow packets
- Three types:
  - 1st gen(Simple packet filtering) (Host-Based: S/W)
  - 2nd gen (TCP sessions inspect)
  - NGFW (Next gen firewalls). Typically network-based 

**Routers**:
- Setup routing tables to decide the routing
- Also referred to as gateways
  
**Autonomous System(AS)**:
- Referred to an organization
- Each AS is assigned a number
  
**Routing Tables**:
- Follow the format `network gateway`
- Each entry in this table also has a type
  - Directly connected (Network which is directly connected to a gateway. Ex: LAN)
  - Remotely Connected (Another Router belonging to AS)
  - Default, Static (Manual entry by router or admin)

**Administrative Distance(AD)**
- Decide trustworthiness of a network. (0 - 255). Lower is better
- Used by routing protocols to send packets
- Direct Connection, static routes have lowest AD

**Dynamic Routing Protocols**:
- To decide best AS among the available for remote connections, dynamic routing protocls are used
- Types:
  - Distance Vector
  - Link State
  - Hybrid

**Routing Protocol Types**:
- Interior Gateway Protocols (IGP)
- Exterior Gateway Protocols (EGP)

**Interior Gateway Protocols (IGP)**:
Used for routing within an AS
- **Routing Information Protocol**(RIP):
  - Is a distance vector dynamic protocol
  - Max hop count: 15
  - Determines route based on hop count
  - Has disavntages like routing loops, network congestion as each router in RIP is configured to send routing table updates to all other routers in the network severly impacting the network. High CPU usage on routers
- **Enhanced Interior Gateway Routing Protocol** (EIGRP):
  - Propertiary CISCO
  - Max Hop Count: 100-255
  - Uses hop count + other metrics like reliability, bandwidth etc
- **Link State Protocols**:
  - **Open Shortest Path First(OSPF)**:
    - Calculates shortest path first based on metrics like link status, speed etc
    - All routers first send advertisement packets to all routers in the and build network map
    - After this only updates to routes are sent to one another instaed of whole routing table information
    - No limit on hop count
    - Builds topological tree of entire network

**Exterior Gateway Protocols (EGP)**:
- **Border Gateway Protocol (BGP)**:
  - Decides route based on AS hop count, not individual hop count using AS 

**Network Address Translation(NAT)**:
- Combat IPv4 shortage. Use dynamic IP within LAN and use limited public IPv4 to communicate over the internet
- Types:
  - SNAT(Static) - Each private ip use unique public ipv4
  - DNAT(Dynamic) - Multiple private ip use unique public ipv4 from a ip pool. If pool is empty, private ips have to wait
  - PAT(Port) - Multiple private ip use single public ipv4 with different ports(Most common)

**Demilitarised Zone(DMZ)**:
- Expose specific services in LAN without exposing all the hosts in LAN over the internet
- Can be done using Firewalls

  