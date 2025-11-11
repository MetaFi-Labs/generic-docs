# ConfigManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/ConfigManager.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md)

Abstract contract for managing controller configuration settings such safety buffers and rewards

Inherits from BaseController and provides role-based configuration management functionality


## State Variables
### CONFIG_MANAGER_ROLE
Role identifier for addresses authorized to manage controller configuration


```solidity
bytes32 public constant CONFIG_MANAGER_ROLE = keccak256("CONFIG_MANAGER_ROLE")
```


## Functions
### __ConfigManager_init

Internal initializer for the ConfigManager contract

This function is called during contract initialization and is marked as onlyInitializing
to ensure it can only be called once during the initialization process


```solidity
function __ConfigManager_init(address rewardsCollector_) internal onlyInitializing;
```

### setRewardsCollector

Updates the address that receives rewards from yield optimization

Only callable by addresses with CONFIG_MANAGER_ROLE


```solidity
function setRewardsCollector(address newRewardsCollector) external onlyRole(CONFIG_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newRewardsCollector`|`address`|The new address to receive rewards|


### setRewardAsset

Adds or removes a token as an approved reward asset

Only callable by addresses with CONFIG_MANAGER_ROLE


```solidity
function setRewardAsset(address asset, bool isReward) external onlyRole(CONFIG_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the token to add or remove as a reward asset|
|`isReward`|`bool`|True to add as a reward asset, false to remove|


### setSafetyBufferYieldDeduction

Updates the safety buffer to a new value

Only addresses with CONFIG_MANAGER_ROLE can call this function


```solidity
function setSafetyBufferYieldDeduction(uint256 newSafetyBufferYieldDeduction)
    external
    onlyRole(CONFIG_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newSafetyBufferYieldDeduction`|`uint256`|The new safety buffer amount to set|


### setMaxProtocolRebalanceSlippage

Updates the maximum allowable protocol rebalance slippage

Only addresses with CONFIG_MANAGER_ROLE can call this function


```solidity
function setMaxProtocolRebalanceSlippage(uint256 newMaxSlippage) external onlyRole(CONFIG_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`newMaxSlippage`|`uint256`|The new maximum slippage in basis points (e.g., 100 = 1%)|


## Events
### RewardsCollectorUpdated
Emitted when the rewards collector address is updated


```solidity
event RewardsCollectorUpdated(address indexed oldRewardsCollector, address indexed newRewardsCollector);
```

### RewardAssetUpdated
Emitted when a reward asset is added or removed


```solidity
event RewardAssetUpdated(address indexed asset, bool isReward);
```

### SafetyBufferYieldDeductionUpdated
Emitted when the safety buffer yield deduction is updated


```solidity
event SafetyBufferYieldDeductionUpdated(uint256 oldBuffer, uint256 newBuffer);
```

### MaxProtocolRebalanceSlippageUpdated
Emitted when the maximum protocol rebalance slippage is updated


```solidity
event MaxProtocolRebalanceSlippageUpdated(uint256 oldMaxSlippage, uint256 newMaxSlippage);
```

## Errors
### Config_RewardsCollectorZeroAddress
Thrown when attempting to set the rewards collector to the zero address


```solidity
error Config_RewardsCollectorZeroAddress();
```

### Config_RewardAssetZeroAddress
Thrown when attempting to set a reward asset to the zero address


```solidity
error Config_RewardAssetZeroAddress();
```

### Config_InvalidMaxSlippage
Thrown when attempting to set a max slippage that exceeds the maximum allowed


```solidity
error Config_InvalidMaxSlippage();
```

