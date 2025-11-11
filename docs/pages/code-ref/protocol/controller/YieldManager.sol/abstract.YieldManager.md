# YieldManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/YieldManager.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md), [AccountingLogic](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/AccountingLogic.sol/abstract.AccountingLogic.md)

Abstract contract that manages yield distribution for the protocol.
Handles the calculation and distribution of yield generated from backing assets,
including protocol fee collection and safety buffer management.


## State Variables
### YIELD_MANAGER_ROLE
Role identifier for addresses authorized to distribute yield


```solidity
bytes32 public constant YIELD_MANAGER_ROLE = keccak256("YIELD_MANAGER_ROLE")
```


## Functions
### __YieldManager_init

This function should be called during contract initialization

Initializer function for the YieldManager contract


```solidity
function __YieldManager_init() internal onlyInitializing;
```

### distributeYield

Distributes yield generated from backing assets to the yield distributor

Calculates yield as the difference between backing assets value and share total supply.
Deducts safety buffer and protocol fees before distribution.
Only callable when share redemption price equals mint price (distribution not paused).


```solidity
function distributeYield() external nonReentrant onlyRole(YIELD_MANAGER_ROLE) returns (uint256 yield);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`yield`|`uint256`|The net amount of yield distributed after fees and safety buffer|


## Events
### YieldDistributed
Emitted when yield is distributed to the yield distributor


```solidity
event YieldDistributed(address indexed yieldDistributor, uint256 yield);
```

## Errors
### Yield_DistributionPaused
Thrown when yield distribution is paused (share redemption price != mint price)


```solidity
error Yield_DistributionPaused();
```

### Yield_ExcessiveSafetyBuffer
Thrown when the safety buffer exceeds the available yield


```solidity
error Yield_ExcessiveSafetyBuffer();
```

