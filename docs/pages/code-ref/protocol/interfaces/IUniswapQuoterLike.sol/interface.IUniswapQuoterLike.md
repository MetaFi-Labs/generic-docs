# IUniswapQuoterLike
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IUniswapQuoterLike.sol)


## Functions
### quoteExactInputSingle


```solidity
function quoteExactInputSingle(
    address tokenIn,
    address tokenOut,
    uint24 fee,
    uint256 amountIn,
    uint160 sqrtPriceLimitX96
)
    external
    returns (uint256 amountOut);
```

