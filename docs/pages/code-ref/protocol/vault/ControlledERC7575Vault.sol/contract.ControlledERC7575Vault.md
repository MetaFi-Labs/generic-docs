# ControlledERC7575Vault
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/vault/ControlledERC7575Vault.sol)

**Inherits:**
ReentrancyGuardTransient, [IERC7575Vault](/code-ref/protocol/interfaces/IERC7575Vault.sol/interface.IERC7575Vault.md), [IControlledVault](/code-ref/protocol/interfaces/IControlledVault.sol/interface.IControlledVault.md)

A base vault implementation that conforms to ERC7575 standards and can be managed by a controller

This contract serves as the foundation for individual asset vaults in the ecosystem.
It handles decimal normalization, controller integration, and implements the core ERC7575 vault operations.
The vault automatically normalizes all asset amounts to 18 decimals for consistent cross-vault calculations,
regardless of the underlying asset's actual decimal places.
Key Features:
- ERC7575 compliant vault operations (deposit, mint, withdraw, redeem)
- Automatic decimal normalization to 18 decimals
- Controller-managed rebalancing capabilities
- Extensible hooks for custom vault implementations
- Safe asset transfers using OpenZeppelin's SafeERC20


## State Variables
### NORMALIZED_ASSET_DECIMALS
The standardized decimal precision used for all normalized asset calculations


```solidity
uint8 public constant NORMALIZED_ASSET_DECIMALS = 18
```


### _asset
The underlying ERC20 asset managed by this vault


```solidity
IERC20 internal immutable _asset
```


### _controller
The controller contract that manages this vault


```solidity
IController internal immutable _controller
```


### _decimalsOffset
The decimal offset used to normalize asset amounts to 18 decimals


```solidity
uint8 internal immutable _decimalsOffset
```


## Functions
### constructor

Constructs a new ControlledERC7575Vault

Initializes the vault with the specified asset and controller. Automatically determines
the decimal offset needed to normalize asset amounts to 18 decimals.
Requirements:
- `asset_` must not be the zero address
- `controller_` must not be the zero address
- asset decimals must not exceed 18


```solidity
constructor(IERC20 asset_, IController controller_) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The ERC20 token that this vault will manage|
|`controller_`|`IController`|The controller contract that will manage this vault|


### share

Returns the address of the share token

All vaults share the same share token as their share representation


```solidity
function share() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the share token contract managed by the controller|


### asset

Returns the address of the underlying asset token

Each vault manages a single underlying asset token


```solidity
function asset() external view override(IControlledVault, IERC7575Vault) returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the underlying asset ERC20 contract|


### totalAssets

Returns the total amount of underlying assets managed by the vault

Includes both assets held directly in the vault and any additional assets
managed through strategies or other mechanisms (via `_additionalOwnedAssets`)


```solidity
function totalAssets() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of assets in the asset's native decimal precision|


### controller

Returns the address of the controller contract that manages this vault

The controller has special privileges to perform operations like rebalancing


```solidity
function controller() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the controller contract|


### totalNormalizedAssets

Returns the total amount of normalized assets held by the vault

Normalized assets are standardized to 18 decimals regardless of the underlying
asset's actual decimal places. Used for consistent cross-vault calculations


```solidity
function totalNormalizedAssets() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total normalized asset amount (always in 18 decimals)|


### convertToShares

Converts an amount of assets to the equivalent amount of shares

In this implementation, shares are 1:1 with normalized assets (18 decimals) due to
missing dynamic pricing context that would be required for more complex calculations


```solidity
function convertToShares(uint256 assets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to convert (in asset's native decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of shares (normalized to 18 decimals)|


### convertToAssets

Converts an amount of shares to the equivalent amount of assets

In this implementation, shares are 1:1 with normalized assets (18 decimals) due to
missing dynamic pricing context that would be required for more complex calculations


```solidity
function convertToAssets(uint256 shares) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to convert (normalized 18 decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of assets (in asset's native decimals)|


### deposit

Deposits assets into the vault and mints shares to the receiver

Transfers assets from the caller, normalizes the amount, and delegates to the controller
for share minting. The controller handles the actual share token minting and any
cross-vault considerations like dynamic pricing.
Requirements:
- Caller must have approved this contract to spend `assets` amount
- `assets` must not exceed the maximum deposit limit
Emits:
- {Deposit} event with the deposit details


```solidity
function deposit(uint256 assets, address receiver) external nonReentrant returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to deposit (in asset's native decimals)|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares minted (normalized to 18 decimals)|


### mint

Mints a specific amount of shares and deposits the required assets

Calculates the required assets through the controller, then transfers assets
from the caller. The controller handles the actual share token minting.
Assets are calculated using ceiling rounding, which ensures that for any non-zero
shares input, the calculated assets will also be non-zero, preventing free share minting.
Requirements:
- Caller must have approved this contract to spend the calculated `assets` amount
- `shares` must not exceed the maximum mint limit
Emits:
- {Deposit} event with the deposit details


```solidity
function mint(uint256 shares, address receiver) external nonReentrant returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to mint (normalized to 18 decimals)|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets deposited (in asset's native decimals)|


### withdraw

Withdraws a specific amount of assets and burns the required shares

Burns shares from the owner through the controller, then transfers assets
to the receiver. Handles any necessary asset rebalancing through hooks.
Requirements:
- If caller is not the owner, they must have sufficient allowance
- `assets` must not exceed the maximum withdrawal limit
- Vault must have sufficient available assets
Emits:
- {Withdraw} event with the withdrawal details


```solidity
function withdraw(
    uint256 assets,
    address receiver,
    address owner
)
    external
    nonReentrant
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to withdraw (in asset's native decimals)|
|`receiver`|`address`|The address that will receive the withdrawn assets|
|`owner`|`address`|The address that owns the shares being burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burned (normalized to 18 decimals)|


### redeem

Redeems a specific amount of shares for assets

Burns shares from the owner through the controller, calculates the assets
to withdraw, then transfers assets to the receiver.
Requirements:
- If caller is not the owner, they must have sufficient allowance
- `shares` must not exceed the maximum redemption limit
- Vault must have sufficient available assets
Emits:
- {Withdraw} event with the withdrawal details


```solidity
function redeem(
    uint256 shares,
    address receiver,
    address owner
)
    external
    nonReentrant
    returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to redeem (normalized to 18 decimals)|
|`receiver`|`address`|The address that will receive the withdrawn assets|
|`owner`|`address`|The address that owns the shares being burned|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets withdrawn (in asset's native decimals)|


### previewDeposit

Previews the amount of shares that would be minted for a given asset deposit

Simulates a deposit operation without executing it. Normalizes the asset amount
and delegates to the controller for share calculation based on current pricing.


```solidity
function previewDeposit(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to preview depositing (in asset's native decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be minted (normalized to 18 decimals)|


### previewMint

Previews the amount of assets required to mint a given amount of shares

Simulates a mint operation without executing it. Delegates to the controller
for asset calculation based on current pricing, then denormalizes the result.


```solidity
function previewMint(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to preview minting (normalized to 18 decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that would be required (in asset's native decimals)|


### previewWithdraw

Previews the amount of shares that would be burned for a given asset withdrawal

Simulates a withdrawal operation without executing it. Normalizes the asset amount
and delegates to the controller for share calculation based on current pricing.


```solidity
function previewWithdraw(uint256 assets) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to preview withdrawing (in asset's native decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be burned (normalized to 18 decimals)|


### previewRedeem

Previews the amount of assets that would be withdrawn for a given share redemption

Simulates a redemption operation without executing it. Delegates to the controller
for asset calculation based on current pricing, then denormalizes the result.


```solidity
function previewRedeem(uint256 shares) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to preview redeeming (normalized to 18 decimals)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that would be withdrawn (in asset's native decimals)|


### maxDeposit

Returns the maximum amount of assets that can be deposited for a given receiver

Delegates to the controller which considers protocol-wide limits, vault capacity,
and any receiver-specific restrictions. Result is denormalized to asset's native decimals.


```solidity
function maxDeposit(address receiver) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that would receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The maximum amount of assets that can be deposited (in asset's native decimals)|


### maxMint

Returns the maximum amount of shares that can be minted for a given receiver

Delegates to the controller which considers protocol-wide limits, vault capacity,
and any receiver-specific restrictions.


```solidity
function maxMint(address receiver) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that would receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The maximum amount of shares that can be minted (normalized to 18 decimals)|


### maxWithdraw

Returns the maximum amount of assets that can be withdrawn by a given owner

Considers both the controller's limits and the vault's available asset liquidity.
The available assets include both vault balance and any immediately accessible
assets from strategies.


```solidity
function maxWithdraw(address owner) external view returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The maximum amount of assets that can be withdrawn (in asset's native decimals)|


### maxRedeem

Returns the maximum amount of shares that can be redeemed by a given owner

Considers both the controller's limits and the vault's available asset liquidity.
The available assets limit how many shares can actually be redeemed for assets.


```solidity
function maxRedeem(address owner) external view returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address that owns the shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The maximum amount of shares that can be redeemed (normalized to 18 decimals)|


### controllerWithdraw

Withdraws assets from the vault by controller

This function can only be called by the designated controller contract.
It's used during rebalancing operations to redistribute assets across
different vaults in the protocol. The function executes any necessary
pre-withdrawal hooks.
Requirements:
- Can only be called by the controller contract
- Vault must have sufficient assets to transfer
Emits:
- {ControllerWithdraw} event with the withdrawn asset amount

**Note:**
security: Access restricted to controller only to prevent unauthorized asset drainage


```solidity
function controllerWithdraw(address asset_, uint256 assets, address receiver) external nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`address`|The address of the asset to withdraw (can be a reward token)|
|`assets`|`uint256`|The amount of assets to withdraw (in asset's native decimals)|
|`receiver`|`address`|The address that will receive the withdrawn assets|


### controllerDeposit

Deposits assets into the vault by controller

This function can only be called by the designated controller contract.
It's used during rebalancing operations to allocate assets that are already
present in the vault. The controller is expected to transfer the assets into
the vault before calling this function. The function executes any necessary
post-deposit hooks to properly allocate the assets.
Requirements:
- Can only be called by the controller contract
Emits:
- {ControllerDeposit} event with the deposited asset amount

**Note:**
security: Access restricted to controller only to prevent unauthorized asset manipulation


```solidity
function controllerDeposit(uint256 assets) external nonReentrant;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets to deposit (in asset's native decimals)|


### _deposit

Internal function to handle asset deposits and emit events

Transfers assets from the caller to the vault, executes post-deposit hooks,
and emits the deposit event. Used by both deposit and mint functions.

**Note:**
security: Uses SafeERC20 for secure token transfers


```solidity
function _deposit(address receiver, uint256 assets, uint256 shares) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that received the minted shares|
|`assets`|`uint256`|The amount of assets deposited (in asset's native decimals)|
|`shares`|`uint256`|The amount of shares minted (normalized to 18 decimals)|


### _withdraw

Internal function to handle asset withdrawals and emit events

Executes pre-withdrawal hooks, transfers assets to the receiver,
and emits the withdrawal event. Used by both withdraw and redeem functions.

**Note:**
security: Uses SafeERC20 for secure token transfers


```solidity
function _withdraw(address receiver, address owner, uint256 assets, uint256 shares) private;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address that will receive the withdrawn assets|
|`owner`|`address`|The address that owns the shares being burned|
|`assets`|`uint256`|The amount of assets withdrawn (in asset's native decimals)|
|`shares`|`uint256`|The amount of shares burned (normalized to 18 decimals)|


### _availableAssets

Calculates the total amount of assets immediately available for withdrawal

Includes assets held directly in the vault plus any additional assets
that can be quickly accessed (e.g., from liquid strategies)


```solidity
function _availableAssets() private view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of immediately available assets (in asset's native decimals)|


### _upscaleDecimals

Converts an asset amount to normalized decimals (18 decimals)

Multiplies by 10^decimalsOffset to scale up from asset's native decimals
to the standardized 18 decimal format used throughout the protocol


```solidity
function _upscaleDecimals(uint256 value) private view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`value`|`uint256`|The amount in asset's native decimals|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount scaled up to 18 decimals|


### _downscaleDecimals

Converts a normalized amount back to the asset's native decimals

Divides by 10^decimalsOffset to scale down from the standardized
18 decimal format to the asset's actual decimal precision


```solidity
function _downscaleDecimals(uint256 value, Math.Rounding rounding) private view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`value`|`uint256`|The amount in normalized 18 decimals|
|`rounding`|`Math.Rounding`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount scaled down to asset's native decimals|


### _additionalOwnedAssets

Hook to calculate additional assets owned by the vault beyond its direct balance

This virtual function allows child contracts to include assets deployed to strategies,
lending protocols, or other yield-generating mechanisms in the total asset calculation.
The base implementation returns 0, assuming no additional assets.

**Note:**
override: Child contracts should override this to include strategy assets


```solidity
function _additionalOwnedAssets() internal view virtual returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of additional assets owned by the vault (in asset's native decimals)|


### _additionalAvailableAssets

Hook to calculate additional assets immediately available for withdrawal

This virtual function allows child contracts to include liquid assets from strategies
or other sources that can be quickly accessed for withdrawals without requiring
complex unwinding operations. The base implementation returns 0.

**Note:**
override: Child contracts should override this to include liquid strategy assets


```solidity
function _additionalAvailableAssets() internal view virtual returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of additional available assets (in asset's native decimals)|


### _beforeWithdraw

Hook executed before asset withdrawals to prepare the vault

This virtual function allows child contracts to implement custom logic before
withdrawals, such as unwinding positions from strategies, ensuring sufficient
liquidity, or updating internal accounting. The base implementation is empty.

**Note:**
override: Child contracts can override this to implement withdrawal preparation logic


```solidity
function _beforeWithdraw(uint256 assets) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets about to be withdrawn (in asset's native decimals)|


### _afterDeposit

Hook executed after asset deposits to process the deposited funds

This virtual function allows child contracts to implement custom logic after
deposits, such as deploying assets to strategies, updating allocations, or
performing other post-deposit operations. The base implementation is empty.

**Note:**
override: Child contracts can override this to implement post-deposit logic


```solidity
function _afterDeposit(uint256 assets) internal virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited (in asset's native decimals)|


## Errors
### ZeroAsset
Thrown when attempting to create a vault with a zero address asset


```solidity
error ZeroAsset();
```

### ZeroController
Thrown when attempting to create a vault with a zero address controller


```solidity
error ZeroController();
```

### NoDecimals
Thrown when the asset's decimals cannot be fetched


```solidity
error NoDecimals();
```

### AssetDecimalsTooHigh
Thrown when the underlying asset has more decimals than the normalized standard


```solidity
error AssetDecimalsTooHigh();
```

### ZeroAssetsOrShares
Thrown when attempting to deposit or withdraw zero assets or shares


```solidity
error ZeroAssetsOrShares();
```

