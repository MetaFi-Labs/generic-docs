# USDSToDAIUniswapV3Swapper
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/periphery/swapper/USDSToDAIUniswapV3Swapper.sol)

**Inherits:**
[UniswapV3Swapper](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/periphery/swapper/UniswapV3Swapper.sol/contract.UniswapV3Swapper.md)

A specialized Uniswap V3 swapper that handles USDS-DAI conversions

This contract extends UniswapV3Swapper to provide seamless swapping between
any token and USDS by automatically converting between DAI and USDS when needed.
It uses a DAI-USDS converter for 1:1 conversions and Uniswap V3 for other token pairs.


## State Variables
### daiToUsdsConverter
The DAI-USDS converter contract for 1:1 conversions


```solidity
IDaiUsdsConverter public immutable daiToUsdsConverter
```


### DAI
The address of the DAI token contract


```solidity
address public immutable DAI
```


### USDS
The address of the USDS token contract


```solidity
address public immutable USDS
```


## Functions
### constructor

Constructs the USDSToDAIUniswapV3Swapper contract


```solidity
constructor(
    IUniswapSwapRouterLike uniswapRouter_,
    IUniswapQuoterLike quoter_,
    IDaiUsdsConverter daiToUsdsConverter_,
    address dai_,
    address usds_
)
    UniswapV3Swapper(uniswapRouter_, quoter_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`uniswapRouter_`|`IUniswapSwapRouterLike`|The address of the Uniswap V3 router contract|
|`quoter_`|`IUniswapQuoterLike`|The address of the Uniswap V3 quoter contract|
|`daiToUsdsConverter_`|`IDaiUsdsConverter`|The address of the DAI-USDS converter contract|
|`dai_`|`address`|The address of the DAI token contract|
|`usds_`|`address`|The address of the USDS token contract|


### swap

Swaps tokens with automatic USDS-DAI conversion handling

This function handles three scenarios:
1. USDS -> Other Token: Converts USDS to DAI, then swaps DAI to target token
2. Other Token -> USDS: Swaps input token to DAI, then converts DAI to USDS
3. Other Token -> Other Token: Uses standard Uniswap V3 swap (via parent contract)


```solidity
function swap(
    address assetIn,
    uint256 amountIn,
    address assetOut,
    uint256 minAmountOut,
    address recipient,
    bytes calldata swapperParams
)
    public
    override
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token to swap from|
|`amountIn`|`uint256`|The amount of input tokens to swap|
|`assetOut`|`address`|The address of the output token to swap to|
|`minAmountOut`|`uint256`|The minimum amount of output tokens expected|
|`recipient`|`address`|The address that will receive the output tokens|
|`swapperParams`|`bytes`|ABI-encoded SwapperParams struct containing the fee tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The actual amount of output tokens received from the swap|


### getAmountOut

Quotes the amount of output tokens with USDS-DAI conversion handling

Automatically substitutes USDS with DAI for price quotes since USDS-DAI
conversion is 1:1. This provides accurate pricing for swaps involving USDS.


```solidity
function getAmountOut(
    address assetIn,
    uint256 amountIn,
    address assetOut,
    bytes calldata swapperParams
)
    public
    override
    returns (uint256 amountOut);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assetIn`|`address`|The address of the input token|
|`amountIn`|`uint256`|The amount of input tokens|
|`assetOut`|`address`|The address of the output token|
|`swapperParams`|`bytes`|ABI-encoded SwapperParams struct containing the fee tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|The estimated amount of output tokens|


## Errors
### BothAssetsUSDS
Thrown when both assets are USDS


```solidity
error BothAssetsUSDS();
```

