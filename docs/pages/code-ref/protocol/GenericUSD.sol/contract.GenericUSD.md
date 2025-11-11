# GenericUSD
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/GenericUSD.sol)

**Inherits:**
[WhitelabeledUnitUpgradeable](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/unit/whitelabeled/WhitelabeledUnitUpgradeable.sol/contract.WhitelabeledUnitUpgradeable.md)

A fully collateralized, omnichain stablecoin implementation

GenericUSD (GUSD) is the primary stablecoin token in the Generic Protocol ecosystem.
It serves as a whitelabeled unit token that wraps underlying value units, enabling
seamless integration with the protocol's ERC-4626 vault infrastructure.
This contract inherits wrapping/unwrapping functionality from WhitelabeledUnitUpgradeable
and maintains 1:1 parity with the underlying unit token through the wrap/unwrap mechanism.


## Functions
### initialize

Initializes the GenericUSD contract with the specified underlying unit token


```solidity
function initialize(IERC20 genericUnit) external initializer;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`genericUnit`|`IERC20`|The address of the underlying Generic unit token to wrap|


