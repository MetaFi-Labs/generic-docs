# AccountingLogic
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/AccountingLogic.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md), [VaultManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/VaultManager.sol/abstract.VaultManager.md)

Abstract contract providing accounting logic for share and asset pricing calculations

Inherits from BaseController and VaultManager to access vault operations and price feeds


## State Variables
### SHARE_MINT_PRICE
The fixed price used for minting new shares (1.0 in normalized decimals)


```solidity
uint256 public constant SHARE_MINT_PRICE = 1 * 10 ** NORMALIZED_PRICE_DECIMALS
```


### ASSET_DEPOSIT_MAX_PRICE
Maximum price cap for asset deposits to prevent overvaluation


```solidity
uint256 public constant ASSET_DEPOSIT_MAX_PRICE = 1 * 10 ** NORMALIZED_PRICE_DECIMALS
```


### ASSET_REDEMPTION_MIN_PRICE
Minimum price floor for asset redemptions to prevent undervaluation


```solidity
uint256 public constant ASSET_REDEMPTION_MIN_PRICE = 1 * 10 ** NORMALIZED_PRICE_DECIMALS
```


## Functions
### assetDepositPrice

Gets the price for depositing a specific asset, capped at maximum deposit price

Uses the minimum between market price and maximum allowed deposit price


```solidity
function assetDepositPrice(address asset) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to get deposit price for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The asset deposit price, limited to ASSET_DEPOSIT_MAX_PRICE|


### assetRedemptionPrice

Gets the price for redeeming a specific asset, floored at minimum redemption price

Uses the maximum between market price and minimum allowed redemption price


```solidity
function assetRedemptionPrice(address asset) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to get redemption price for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The asset redemption price, at least ASSET_REDEMPTION_MIN_PRICE|


### shareDepositPrice

Gets the fixed price for depositing/minting shares

Returns a constant value as share minting always uses a fixed price


```solidity
function shareDepositPrice() public pure returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The share deposit price (always SHARE_MINT_PRICE)|


### shareRedemptionPrice

Calculates the current redemption price for shares based on backing value

Price is calculated as backing value per share, with a max of SHARE_MINT_PRICE


```solidity
function shareRedemptionPrice() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The share redemption price based on total backing assets and share supply|


### backingAssetsValue

Calculates the total value of all backing assets across all vaults

Iterates through all vaults, gets asset prices and vault balances, then sums the total value


```solidity
function backingAssetsValue() public view returns (uint256 totalValue);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalValue`|`uint256`|The combined value of all vault assets in normalized decimals|


### safetyBuffer

Safety buffer amount maintained to stabilize share redemption prices

Buffer is used to maintain stable share redemption prices during periods of expected
asset volatility, ensuring consistent pricing for share holders during market fluctuations.


```solidity
function safetyBuffer() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current safety buffer amount in normalized decimals|


### _convertToShares

Converts normalized asset amounts to share amounts using given prices


```solidity
function _convertToShares(
    uint256 normalizedAssets,
    uint256 assetPrice,
    uint256 sharePrice,
    Math.Rounding rounding
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`normalizedAssets`|`uint256`|The amount of normalized assets to convert|
|`assetPrice`|`uint256`|The price of the asset in normalized decimals|
|`sharePrice`|`uint256`|The price of shares in normalized decimals|
|`rounding`|`Math.Rounding`|The rounding mode to use for division|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of shares|


### _convertToAssets

Converts share amounts to normalized asset amounts using given prices


```solidity
function _convertToAssets(
    uint256 shares,
    uint256 assetPrice,
    uint256 sharePrice,
    Math.Rounding rounding
)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to convert|
|`assetPrice`|`uint256`|The price of the asset in normalized decimals|
|`sharePrice`|`uint256`|The price of shares in normalized decimals|
|`rounding`|`Math.Rounding`|The rounding mode to use for division|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The equivalent amount of normalized assets|


### _shareRedemptionPrice

Internal function to calculate share redemption price based on backing value and supply


```solidity
function _shareRedemptionPrice(uint256 backingValue) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`backingValue`|`uint256`|The total value of backing assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The calculated share redemption price|


### _safetyBuffer

Internal function to calculate the safety buffer based on backing value


```solidity
function _safetyBuffer(uint256 backingValue) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`backingValue`|`uint256`|The total value of backing assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The calculated safety buffer amount|


