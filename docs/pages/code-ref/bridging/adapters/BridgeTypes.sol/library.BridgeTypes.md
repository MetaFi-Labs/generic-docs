# BridgeTypes
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/adapters/BridgeTypes.sol)

This library defines immutable constants used throughout the system

These constants must never be changed once deployed. Only new constants can be added.
Modifying existing constants would break compatibility and potentially cause
security vulnerabilities in dependent contracts.

**Note:**
security-note: Changing any existing constant values is strictly prohibited.
New constants may be added but existing ones are immutable.


## State Variables
### LAYER_ZERO

```solidity
uint16 constant LAYER_ZERO = 1
```


### LINEA

```solidity
uint16 constant LINEA = 2
```


