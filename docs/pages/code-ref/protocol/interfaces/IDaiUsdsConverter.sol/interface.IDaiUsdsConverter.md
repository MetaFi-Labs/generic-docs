# IDaiUsdsConverter
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IDaiUsdsConverter.sol)

Interface for converting between DAI and USDS tokens

This interface defines the standard for bi-directional conversion
between DAI and USDS. Implementations handle the actual conversion
logic and rates.


## Functions
### daiToUsds

Converts DAI tokens to USDS tokens

Converts the specified amount of DAI to USDS for the given user.
The conversion rate and mechanism depend on the implementation.


```solidity
function daiToUsds(address usr, uint256 wad) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`usr`|`address`|The address of the user receiving the converted USDS tokens|
|`wad`|`uint256`|The amount of DAI tokens to convert (in wei/wad units)|


### usdsToDai

Converts USDS tokens to DAI tokens

Converts the specified amount of USDS to DAI for the given user.
The conversion rate and mechanism depend on the implementation.


```solidity
function usdsToDai(address usr, uint256 wad) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`usr`|`address`|The address of the user receiving the converted DAI tokens|
|`wad`|`uint256`|The amount of USDS tokens to convert (in wei/wad units)|


