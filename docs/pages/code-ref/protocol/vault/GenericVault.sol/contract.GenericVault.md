# GenericVault
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/vault/GenericVault.sol)

**Inherits:**
[SingleStrategyVault](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/vault/SingleStrategyVault.sol/contract.SingleStrategyVault.md)

A vault that utilizes a single strategy for asset management.

Inherits from SingleStrategyVault to provide core vault functionalities.


## State Variables
### VERSION

```solidity
string public constant VERSION = "1.0"
```


## Functions
### constructor


```solidity
constructor(
    IERC20 asset_,
    IController controller_,
    IERC4626 strategy_,
    address manager_
)
    SingleStrategyVault(asset_, controller_, strategy_, manager_);
```

