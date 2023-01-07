**Open Systems Interconnection (OSI)**:  
Theoretical architecture of protocols governing network communication  

| Layer-Number  | Name                | Data Unit  | Applicable  | Notes             | Protocols       |
| -----------   | -----------         |----------- | ----------- | -----------       | -----------     |
|7              | **A**pplication     | Data       | Host        | Applications interacting with netowk protocols | HTTP(S), FTP, SSH, DNS |
|6              | **P**resentation    | Data       | Host        | Data encoding, de/compression, de,encryption | TLS, SSL(encryption/decryption), Formats: XML, HTML, JPEG, PNG, ASCII etc |
|5              | **S**ession         | Data       | Host        | Maintainance of sessions |    Simplex, Duplex |
|4              | **T**ransport       | Segments   | Host        | Error control & Data flow for devices residing in different networks. Port addressing | TCP, UDP |
|3              | **N**etwork         | Packets    | Network     | Logical Addressing, Routing | IP, ICMP, IGMP, ping |  
|2              | **D**atalink        | Frames     | Network     | Error control & Data flow for devices residing in same network.Physical addressing. LLC & MAC(CSMA/CD - wired, /CA - wireless) | ARP, RARP | 
|1              | **P**hysical        | Bits       | Network     |  Wired/Wireless network topologies | | 

**TCP/IP**:  
Internet based on this architecture  

| Layer-Number  | Name              | OSI Equivalent |
| -----------   | -----------       | -----------    | 
|4              | Application       |    7, 6, 5     |
|3              | Transport         |    4           |
|2              | Internet          |    3           |
|1              | Network Interface |    2, 1        |


**Mac Address**:  
- OSI Layer 2 address
- 6 byte physical address represented using hexadecimal digits
- First 3 bytes are fixed(also called OUI) and given by IEEE to an organization
- Last 3 bytes are free to be changed (2^24 addresses)
- Physically burnt onto NIC.

**IPv4**:
- 4 byte logical address assigned to network interface. 
- Represented using decimal digits
- OSI Layer 3 address
- Network portion + Host protion = IP address
  - Network portion is decided by subnet mask

**Wireless Topologies**
- Ad-Hoc (Basically P2P)
- Infrastructure (Most common, One central network management device)
- Mesh (Most expensive & HA. Multiple devices communicating with each other to establish a mesh network)