**Open Systems Interconnection (OSI)**:  
Theoretical architecture of protocols governing network communication  

| Layer-Number  | Name                | Data Unit  | Applicable  |
| -----------   | -----------         |----------- | ----------- |
|7              | **A**pplication     | Data       | Host        |
|6              | **P**resentation    | Data       | Host        |
|5              | **S**ession         | Data       | Host        |
|4              | **T**ransport       | Segments   | Host        |
|3              | **N**etwork         | Packets    | Network     |
|2              | **D**atalink        | Frames     | Network     |
|1              | **P**hysical        | Bits       | Network     |

**TCP/IP**:  
Internet works on this architecture  

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