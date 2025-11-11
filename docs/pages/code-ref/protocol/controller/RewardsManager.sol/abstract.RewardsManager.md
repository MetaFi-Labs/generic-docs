# RewardsManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/RewardsManager.sol)

**Inherits:**
[BaseController](/code-ref/protocol/controller/BaseController.sol/abstract.BaseController.md), [VaultManager](/code-ref/protocol/controller/VaultManager.sol/abstract.VaultManager.md)

Abstract contract that manages rewards for controlled vaults

Provides functionality to sell reward tokens for vault assets or claim rewards directly


## State Variables
### REWARDS_MANAGER_ROLE
Role identifier for addresses authorized to manage rewards


```solidity
bytes32 public constant REWARDS_MANAGER_ROLE = keccak256("REWARDS_MANAGER_ROLE")
```


## Functions
### __RewardsManager_init

Initializes the RewardsManager contract

This function is called during contract initialization and is marked as onlyInitializing
to ensure it can only be called once during the initialization process


```solidity
function __RewardsManager_init() internal onlyInitializing;
```

### sellRewards

Sells reward tokens from a vault and converts them to vault assets

Withdraws reward tokens from the vault, swaps them for vault assets using the swapper,
and deposits the received assets back into the vault


```solidity
function sellRewards(
    address vault,
    address rewardAsset,
    uint256 minAmountOut,
    bytes calldata swapperData
)
    external
    nonReentrant
    onlyRole(REWARDS_MANAGER_ROLE)
    returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault containing the reward tokens|
|`rewardAsset`|`address`|The address of the reward token to sell|
|`minAmountOut`|`uint256`|The minimum amount of vault assets expected from the swap|
|`swapperData`|`bytes`|Additional data required by the swapper for the token swap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of vault assets received from selling the rewards|


### claimRewards

Claims reward tokens from a vault and sends them to the rewards collector

Withdraws all available reward tokens from the vault and transfers them to the rewards collector


```solidity
function claimRewards(
    address vault,
    address rewardAsset
)
    external
    nonReentrant
    onlyRole(REWARDS_MANAGER_ROLE)
    returns (uint256 rewards);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault containing the reward tokens|
|`rewardAsset`|`address`|The address of the reward token to claim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewards`|`uint256`|The amount of reward tokens claimed and transferred|


### _rewards

Internal function to get the amount of reward tokens in a vault

Validates the vault and reward asset, then retrieves the balance of the reward asset in the vault


```solidity
function _rewards(
    address vault,
    address rewardAsset
)
    internal
    view
    returns (uint256 rewards, address vaultAsset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to check for rewards|
|`rewardAsset`|`address`|The address of the reward token to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewards`|`uint256`|The amount of reward tokens available in the vault|
|`vaultAsset`|`address`|The address of the vault's primary asset (for cache purposes)|


## Events
### RewardsSold
Emitted when reward tokens are sold and converted to vault assets


```solidity
event RewardsSold(address indexed vault, address indexed rewardAsset, uint256 rewards, uint256 assets);
```

### RewardsClaimed
Emitted when reward tokens are claimed and sent to a receiver


```solidity
event RewardsClaimed(address indexed vault, address indexed rewardAsset, address indexed receiver, uint256 rewards);
```

## Errors
### Reward_InvalidVault
Thrown when an invalid vault address is provided


```solidity
error Reward_InvalidVault();
```

### Reward_NotRewardAsset
Thrown when the reward asset is not approved for use


```solidity
error Reward_NotRewardAsset();
```

### Reward_SameAssets
Thrown when the reward asset is the same as the vault asset


```solidity
error Reward_SameAssets();
```

### Reward_ZeroRewards
Thrown when there are no rewards to process


```solidity
error Reward_ZeroRewards();
```

### Reward_SlippageTooHigh
Thrown when the received assets are below the minimum expected amount


```solidity
error Reward_SlippageTooHigh();
```

