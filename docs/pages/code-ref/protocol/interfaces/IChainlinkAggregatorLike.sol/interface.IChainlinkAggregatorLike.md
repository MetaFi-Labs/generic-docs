# IChainlinkAggregatorLike
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/interfaces/IChainlinkAggregatorLike.sol)

Interface for interacting with Chainlink price feed aggregators

This interface provides a simplified view of Chainlink aggregator contracts,
focusing on the essential functions needed for price data retrieval.
It follows the Chainlink AggregatorV3Interface pattern but with a reduced surface area.


## Functions
### decimals

Returns the number of decimals the aggregator responses represent


```solidity
function decimals() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The number of decimals for the price data (e.g., 8 for USD pairs, 18 for ETH pairs)|


### latestRoundData

Returns detailed data for the latest round of price updates

This function provides comprehensive information about the latest price round,
including timestamps and round identifiers. It is useful for verifying the freshness
and reliability of the price data.


```solidity
function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`roundId`|`uint80`|The identifier for the latest round|
|`answer`|`int256`|The latest price as a signed integer|
|`startedAt`|`uint256`|The timestamp when the round started|
|`updatedAt`|`uint256`|The timestamp when the round was last updated|
|`answeredInRound`|`uint80`|The round ID in which the answer was computed|


