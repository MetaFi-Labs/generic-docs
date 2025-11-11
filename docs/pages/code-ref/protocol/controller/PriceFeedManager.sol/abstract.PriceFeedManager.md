# PriceFeedManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/PriceFeedManager.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md)

Abstract contract for managing Chainlink price feeds for various assets

Extends BaseController and provides functionality to set, retrieve, and validate price feeds
All prices are normalized to 18 decimals for consistency across the protocol


## State Variables
### PRICE_FEED_MANAGER_ROLE
Role identifier for price feed management operations


```solidity
bytes32 public constant PRICE_FEED_MANAGER_ROLE = keccak256("PRICE_FEED_MANAGER_ROLE")
```


### HEARTBEAT_BUFFER
Buffer time for price feed heartbeats

Allows a small grace period beyond the configured heartbeat to account for minor delays


```solidity
uint256 public constant HEARTBEAT_BUFFER = 1 minutes
```


### NORMALIZED_PRICE_DECIMALS
Number of decimals used for normalized price representation


```solidity
uint8 public constant NORMALIZED_PRICE_DECIMALS = 18
```


## Functions
### __PriceFeedManager_init

Internal initialization function for PriceFeedManager

Must be called during contract initialization. Currently empty but reserved for future use


```solidity
function __PriceFeedManager_init() internal onlyInitializing;
```

### setPriceFeed

Sets the Chainlink price feed for a specific asset

Only callable by accounts with PRICE_FEED_MANAGER_ROLE


```solidity
function setPriceFeed(
    address asset,
    IChainlinkAggregatorLike feed,
    uint24 heartbeat
)
    external
    onlyRole(PRICE_FEED_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to set the price feed for|
|`feed`|`IChainlinkAggregatorLike`|The Chainlink aggregator interface for the asset's price feed|
|`heartbeat`|`uint24`|The maximum allowed time in seconds between price updates before data is considered stale|


### getAssetPrice

Retrieves the current price of an asset from its configured price feed

Normalizes the price to 18 decimals regardless of the feed's native decimal places


```solidity
function getAssetPrice(address asset) public view returns (uint256 normalizedPrice);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to get the price for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`normalizedPrice`|`uint256`|The asset's price normalized to 18 decimals|


### priceFeedExists

Checks if a price feed exists for the given asset

Overrides the abstract function from BaseController


```solidity
function priceFeedExists(address asset) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`address`|The address of the asset to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if a price feed is configured for the asset, false otherwise|


## Events
### PriceFeedUpdated
Emitted when a price feed is updated for an asset


```solidity
event PriceFeedUpdated(
    address indexed asset, address indexed oldFeed, address indexed newFeed, uint24 newHeartbeat
);
```

## Errors
### PriceFeed_ZeroAsset
Thrown when attempting to set a price feed for a zero address asset


```solidity
error PriceFeed_ZeroAsset();
```

### PriceFeed_ZeroFeed
Thrown when attempting to set a zero address as a price feed


```solidity
error PriceFeed_ZeroFeed();
```

### PriceFeed_ZeroHeartbeat
Thrown when the provided heartbeat value is zero


```solidity
error PriceFeed_ZeroHeartbeat();
```

### PriceFeed_FeedNotExists
Thrown when trying to get price for an asset without a configured price feed


```solidity
error PriceFeed_FeedNotExists();
```

### PriceFeed_InvalidPrice
Thrown when the price feed returns an invalid (non-positive) price


```solidity
error PriceFeed_InvalidPrice();
```

### PriceFeed_StalePrice
Thrown when the price feed data is stale based on the configured heartbeat


```solidity
error PriceFeed_StalePrice();
```

### PriceFeed_DecimalsTooHigh
Thrown when the price feed has more decimals than the normalized decimals


```solidity
error PriceFeed_DecimalsTooHigh();
```

