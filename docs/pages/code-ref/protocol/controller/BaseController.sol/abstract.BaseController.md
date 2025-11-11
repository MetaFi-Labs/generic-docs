# BaseController
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/BaseController.sol)

**Inherits:**
AccessControlUpgradeable, ReentrancyGuardTransientUpgradeable

Base contract for controller implementations that provides common functionality

This contract is designed to be deployed as an upgradeable proxy. Any future upgrades
MUST strictly adhere to the existing storage layout to prevent storage collisions.
CRITICAL STORAGE LAYOUT REQUIREMENTS:
- Never change the order of existing state variables
- Never change the type of existing state variables
- Never remove existing state variables
- Only append new state variables at the end
- Be aware of storage packing when adding new variables
- Consider using storage gaps for future extensibility
Violating these rules will corrupt the proxy's storage and may lead to:
- Loss of funds
- Incorrect contract behavior
- Permanent contract malfunction


## State Variables
### MAX_BPS
Maximum basis points value representing 100%


```solidity
uint256 public constant MAX_BPS = 10_000
```


### paused
Indicates whether the protocol is currently paused

When true, prevents certain operations like deposits and withdrawals


```solidity
bool public paused
```


### skipNextRebalanceSafetyBufferCheck
Flag to skip the safety buffer check during the next rebalance operation

This is a temporary override to allow emergency rebalancing even if the safety buffer condition is not met


```solidity
bool public skipNextRebalanceSafetyBufferCheck
```


### _share
Share token contract for controlled vaults

Manages the issuance and burning of share tokens representing ownership stakes in controlled vaults


```solidity
IGenericShare internal _share
```


### priceFeeds
Mapping of asset addresses to their configured price feeds

Each asset is assumed to have a corresponding {asset}/USD price feed


```solidity
mapping(address asset => PriceFeed) public priceFeeds
```


### vaultSettings
Mapping of vault addresses to their configuration settings

Stores operational parameters for each registered vault including capacity and proportionality limits


```solidity
mapping(address vault => VaultSettings) public vaultSettings
```


### _vaultFor
Mapping of asset addresses to their designated main vaults


```solidity
mapping(address asset => address) internal _vaultFor
```


### _vaults
Linked list implementation for efficient vault management

Structure: SENTINEL_VAULTS -> Vault1 -> Vault2 -> ... -> SENTINEL_VAULTS


```solidity
mapping(address vault => address nextVault) internal _vaults
```


### _vaultsCount
Total number of vaults currently registered in the system

Maintained separately for efficient count queries without requiring linked list traversal


```solidity
uint8 internal _vaultsCount
```


### maxProtocolRebalanceSlippage
Maximum allowable slippage during protocol-level rebalancing operations (in basis points)

This slippage threshold applies to the entire backing value of the protocol, not just the
individual rebalancing amounts. It serves as a safety mechanism to prevent excessive value
loss during rebalancing activities across all protocol assets.


```solidity
uint16 public maxProtocolRebalanceSlippage
```


### rewardsCollector
Address that collects rewards generated from yield optimization strategies

Rewards collected here can be reinvested or distributed as per protocol governance decisions.


```solidity
address public rewardsCollector
```


### isRewardAsset
Mapping of token addresses to their approval status as reward tokens

When true, indicates the token is allowed to be transferred from vaults as rewards


```solidity
mapping(address => bool) public isRewardAsset
```


### _swapper
Token swapping component for rebalancing operations

Used to execute token swaps for rebalancing and yield optimization operations


```solidity
ISwapper internal _swapper
```


### _yieldDistributor
Yield distribution manager for protocol earnings

Handles the distribution of generated yields to appropriate recipients and fee collection


```solidity
IYieldDistributor internal _yieldDistributor
```


### safetyBufferYieldDeduction
The absolute amount deducted from yield distributions as a safety buffer

This value is subtracted from the total yield before distribution to users
to maintain protocol stability and cover potential losses or unexpected events.
The deduction helps ensure the protocol remains solvent during volatile market conditions.


```solidity
uint256 public safetyBufferYieldDeduction
```


### __gap
Reserved storage space to allow for layout changes in the future.


```solidity
uint256[50] private __gap
```


## Structs
### PriceFeed
Configuration structure for asset price feeds

Encapsulates the oracle feed and its staleness parameters


```solidity
struct PriceFeed {
    IChainlinkAggregatorLike feed;
    uint24 heartbeat;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`feed`|`IChainlinkAggregatorLike`|The Chainlink-compatible price feed aggregator interface|
|`heartbeat`|`uint24`|Maximum time in seconds between price updates before data is considered stale|

### VaultSettings
Configuration parameters for individual vaults

Defines operational limits and risk parameters for vault management


```solidity
struct VaultSettings {
    uint224 maxCapacity;
    uint16 minProportionality;
    uint16 maxProportionality;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`maxCapacity`|`uint224`|Maximum total value that can be deposited into the vault (in asset units)|
|`minProportionality`|`uint16`|Minimum proportion of total protocol assets this vault should maintain (in basis points)|
|`maxProportionality`|`uint16`|Maximum proportion of total protocol assets this vault can hold (in basis points)|

