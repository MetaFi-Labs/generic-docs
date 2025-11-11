# Controller
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/Controller.sol)

**Inherits:**
[IController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/interfaces/IController.sol/interface.IController.md), [PriceFeedManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/PriceFeedManager.sol/abstract.PriceFeedManager.md), [VaultManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/VaultManager.sol/abstract.VaultManager.md), [ConfigManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/ConfigManager.sol/abstract.ConfigManager.md), [PeripheryManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/PeripheryManager.sol/abstract.PeripheryManager.md), [AccountingLogic](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/AccountingLogic.sol/abstract.AccountingLogic.md), [RebalancingManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/RebalancingManager.sol/abstract.RebalancingManager.md), [VaultLimitsLogic](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/VaultLimitsLogic.sol/abstract.VaultLimitsLogic.md), [YieldManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/YieldManager.sol/abstract.YieldManager.md), [EmergencyManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/EmergencyManager.sol/abstract.EmergencyManager.md), [RewardsManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/RewardsManager.sol/abstract.RewardsManager.md)

Core controller contract that manages vaults, shares, and protocol operations

Inherits from multiple manager contracts to provide comprehensive vault management functionality
This contract handles ERC7575 vault operations, price feeds, fee management, rebalancing,
yield distribution, and periphery integrations


## Functions
### onlyVault

Ensures only registered vaults can call the function


```solidity
modifier onlyVault() ;
```

### _onlyVault


```solidity
function _onlyVault() internal view;
```

### onlyMainVault

Ensures only the main vault for an asset can call the function


```solidity
modifier onlyMainVault() ;
```

### _onlyMainVault


```solidity
function _onlyMainVault() internal view;
```

### constructor

Constructor that disables initializers to prevent direct initialization

Uses OpenZeppelin's initializer pattern for upgradeable contracts


```solidity
constructor() ;
```

### initialize

Initializes the Controller with required parameters

Can only be called once due to initializer modifier. Reverts if admin or share address is zero.


```solidity
function initialize(
    address admin,
    IGenericShare share_,
    address rewardsCollector_,
    ISwapper swapper_,
    IYieldDistributor yieldDistributor_
)
    external
    initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`admin`|`address`|Address that will receive admin role for access control|
|`share_`|`IGenericShare`|The address of protocol shares|
|`rewardsCollector_`|`address`|Address that will collect rewards from yield optimization|
|`swapper_`|`ISwapper`|Swapper contract for token exchanges|
|`yieldDistributor_`|`IYieldDistributor`|Contract for distributing yield to stakeholders|


### share

Returns the address of the share token contract


```solidity
function share() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the share token contract|


### vaultFor

Returns the main vault address for a given asset


```solidity
function vaultFor(address asset) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the main vault for the specified asset|


### maxDeposit

Returns the maximum amount of assets that can be deposited for a receiver

Only callable by main vaults, uses current vault limits and overview


```solidity
function maxDeposit(
    address /* receiver */
)
    public
    view
    onlyMainVault
    returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum deposit amount in normalized asset units|


### maxMint

Returns the maximum amount of shares that can be minted for a receiver

Only callable by main vaults, converts max deposit limit to shares


```solidity
function maxMint(
    address /* receiver */
)
    public
    view
    onlyMainVault
    returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum mint amount in shares|


### maxWithdraw

Returns the maximum amount of assets that can be withdrawn by an owner

Only callable by vaults, considers both vault limits and owner's balance


```solidity
function maxWithdraw(address owner, uint256 availableAssets) public view onlyVault returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the share holder|
|`availableAssets`|`uint256`|The amount of assets currently available in the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum withdrawal amount in normalized asset units|


### maxRedeem

Returns the maximum number of shares that can be redeemed by an owner

Only callable by vaults, considers both vault limits and owner's balance


```solidity
function maxRedeem(address owner, uint256 availableAssets) public view onlyVault returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address of the share holder|
|`availableAssets`|`uint256`|The amount of assets currently available in the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum redeem amount in shares|


### previewDeposit

Simulates the effects of a deposit at the current block

Only callable by main vaults, uses deposit pricing


```solidity
function previewDeposit(uint256 normalizedAssets) public view onlyMainVault returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets to deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be received|


### previewMint

Simulates the effects of a mint at the current block

Only callable by main vaults, uses deposit pricing with ceiling rounding


```solidity
function previewMint(uint256 shares) public view onlyMainVault returns (uint256 normalizedAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to mint|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets that would be required|


### previewWithdraw

Simulates the effects of a withdrawal at the current block

Only callable by vaults, uses redemption pricing with ceiling rounding


```solidity
function previewWithdraw(uint256 normalizedAssets) public view onlyVault returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets to withdraw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be burned|


### previewRedeem

Simulates the effects of a redemption at the current block

Only callable by vaults, uses redemption pricing


```solidity
function previewRedeem(uint256 shares) public view onlyVault returns (uint256 normalizedAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to redeem|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets that would be withdrawn|


### deposit

Deposits normalized assets and mints shares to receiver

Only callable by main vaults when not paused, validates deposit doesn't exceed limits


```solidity
function deposit(
    uint256 normalizedAssets,
    address receiver
)
    public
    onlyMainVault
    notPaused
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets to deposit|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares minted to the receiver|


### mint

Mints exact amount of shares to receiver for required assets

Only callable by main vaults when not paused, validates required assets don't exceed limits


```solidity
function mint(
    uint256 shares,
    address receiver
)
    public
    onlyMainVault
    notPaused
    returns (uint256 normalizedAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to mint|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets required for minting|


### withdraw

Burns shares from owner and withdraws exact amount of normalized assets

Only callable by vaults when not paused, validates withdrawal doesn't exceed limits and owner balance


```solidity
function withdraw(
    uint256 normalizedAssets,
    address spender,
    address owner
)
    public
    onlyVault
    notPaused
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets to withdraw|
|`spender`|`address`|The address authorized to spend the owner's shares|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned from the owner|


### redeem

Burns exact amount of shares from owner and withdraws corresponding assets

Only callable by vaults when not paused, validates owner has sufficient balance and withdrawal doesn't
exceed limits


```solidity
function redeem(
    uint256 shares,
    address spender,
    address owner
)
    public
    onlyVault
    notPaused
    returns (uint256 normalizedAssets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to redeem|
|`spender`|`address`|The address authorized to spend the owner's shares|
|`owner`|`address`|The address that owns the shares to be burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets withdrawn|


## Errors
### Controller_ZeroAdmin
Thrown when admin address is zero during initialization


```solidity
error Controller_ZeroAdmin();
```

### Controller_ZeroShare
Thrown when share address is zero during initialization


```solidity
error Controller_ZeroShare();
```

### Controller_DepositExceedsMax
Thrown when deposit amount exceeds maximum allowed limit


```solidity
error Controller_DepositExceedsMax();
```

### Controller_MintExceedsMax
Thrown when mint amount exceeds maximum allowed limit


```solidity
error Controller_MintExceedsMax();
```

### Controller_WithdrawExceedsMax
Thrown when withdrawal amount exceeds maximum allowed limit


```solidity
error Controller_WithdrawExceedsMax();
```

### Controller_RedeemExceedsMax
Thrown when redeem amount exceeds maximum allowed limit


```solidity
error Controller_RedeemExceedsMax();
```

### Controller_CallerNotVault
Thrown when caller is not a registered vault


```solidity
error Controller_CallerNotVault();
```

### Controller_CallerNotMainVault
Thrown when caller is not the main vault for an asset


```solidity
error Controller_CallerNotMainVault();
```

