# tryGetAssetDecimals
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/utils/tryGetAssetDecimals.sol)

Safely attempts to retrieve the decimal places of an ERC20 token

Uses a low-level staticcall to avoid reverting if the token doesn't implement decimals()
or if the implementation is non-standard. Validates that the returned value fits in uint8.


```solidity
function tryGetAssetDecimals(IERC20 asset_) view returns (bool ok, uint8 assetDecimals);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|The ERC20 token contract to query|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`ok`|`bool`|True if the decimals were successfully retrieved and are valid, false otherwise|
|`assetDecimals`|`uint8`|The number of decimal places for the token (0-255), or 0 if retrieval failed|


