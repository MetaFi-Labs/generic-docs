# PeripheryManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/PeripheryManager.sol)

**Inherits:**
[BaseController](/code-ref/protocol/controller/BaseController.sol/abstract.BaseController.md)

Abstract contract for managing periphery services like swappers and yield distributors

Inherits from BaseController and provides role-based management of external service contracts


## State Variables
### PERIPHERY_MANAGER_ROLE
Role identifier for addresses authorized to manage periphery services


```solidity
bytes32 public constant PERIPHERY_MANAGER_ROLE = keccak256("PERIPHERY_MANAGER_ROLE")
```


## Functions
### __PeripheryManager_init

Initializes the PeripheryManager with swapper and yield distributor contracts

Internal function called during contract initialization


```solidity
function __PeripheryManager_init(
    ISwapper swapper_,
    IYieldDistributor yieldDistributor_
)
    internal
    onlyInitializing;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`swapper_`|`ISwapper`|The swapper contract interface for token swapping operations|
|`yieldDistributor_`|`IYieldDistributor`|The yield distributor contract interface for yield distribution|


### setSwapper

Updates the swapper contract used for token swapping operations

Only callable by addresses with PERIPHERY_MANAGER_ROLE


```solidity
function setSwapper(ISwapper newSwapper) external onlyRole(PERIPHERY_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newSwapper`|`ISwapper`|The new swapper to use|


### setYieldDistributor

Updates the yield distributor contract used for yield distribution

Only callable by addresses with PERIPHERY_MANAGER_ROLE


```solidity
function setYieldDistributor(IYieldDistributor newDistributor) external onlyRole(PERIPHERY_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newDistributor`|`IYieldDistributor`|The new yield distributor to use|


### swapper

Returns the address of the current swapper contract


```solidity
function swapper() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the swapper contract|


### yieldDistributor

Returns the address of the current yield distributor contract


```solidity
function yieldDistributor() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the yield distributor contract|


## Events
### SwapperUpdated
Emitted when the swapper contract address is updated


```solidity
event SwapperUpdated(address indexed oldSwapper, address indexed newSwapper);
```

### YieldDistributorUpdated
Emitted when the yield distributor contract address is updated


```solidity
event YieldDistributorUpdated(address indexed oldDistributor, address indexed newDistributor);
```

## Errors
### Periphery_ZeroSwapper
Thrown when attempting to set the swapper to the zero address


```solidity
error Periphery_ZeroSwapper();
```

### Periphery_ZeroYieldDistributor
Thrown when attempting to set the yield distributor to the zero address


```solidity
error Periphery_ZeroYieldDistributor();
```

