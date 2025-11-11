# GenericDepositor
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/periphery/GenericDepositor.sol)

Helper contract to automate deposits into the GUSD vault system

Users must approve this contract to spend their assets before calling deposit/mint functions
The contract automatically resolves the correct vault for each asset type
and handles all necessary approvals and transfers on behalf of users.


## State Variables
### unitToken
The Generic unit token that represents shares across all vaults


```solidity
IGenericShare public immutable unitToken
```


### bridgeCoordinator
The bridge coordinator for cross-chain operations


```solidity
IBridgeCoordinatorL1Outbound public immutable bridgeCoordinator
```


## Functions
### constructor

Initializes the GenericDepositor with required contract references


```solidity
constructor(IGenericShare _unitToken, IBridgeCoordinatorL1Outbound _bridgeCoordinator) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_unitToken`|`IGenericShare`|The Generic unit token contract|
|`_bridgeCoordinator`|`IBridgeCoordinatorL1Outbound`|The bridge coordinator for cross-chain operations|


### deposit

Deposits assets into the appropriate vault and mints shares to the caller

Automatically resolves the correct vault for the given asset


```solidity
function deposit(IERC20 asset, address whitelabel, uint256 assets) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`whitelabel`|`address`|The whitelabeled unit token address, or address(0) for standard units|
|`assets`|`uint256`|The amount of assets to deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of shares minted to the caller|


### mint

Mints a specific amount of shares by depositing the required assets

Calculates the required asset amount using previewMint and deposits that amount


```solidity
function mint(IERC20 asset, address whitelabel, uint256 shares) external returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`whitelabel`|`address`|The whitelabeled unit token address, or address(0) for standard units|
|`shares`|`uint256`|The exact number of shares to mint|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited|


### depositAndBridge

Deposits assets and immediately bridges the resulting shares to another chain

Combines deposit and bridge operations in a single transaction


```solidity
function depositAndBridge(
    IERC20 asset,
    uint256 assets,
    uint16 bridgeType,
    uint256 chainId,
    bytes32 remoteRecipient,
    bytes32 whitelabel,
    bytes calldata bridgeParams
)
    external
    payable
    returns (uint256 shares, bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`assets`|`uint256`|The amount of assets to deposit|
|`bridgeType`|`uint16`|The type of bridge to use|
|`chainId`|`uint256`|The destination chain ID|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|
|`whitelabel`|`bytes32`||
|`bridgeParams`|`bytes`|Additional parameters required by the bridge|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of shares minted|
|`messageId`|`bytes32`|The bridge message ID for tracking|


### mintAndBridge

Mints a specific amount of shares and immediately bridges them to another chain

Combines mint and bridge operations in a single transaction


```solidity
function mintAndBridge(
    IERC20 asset,
    uint256 shares,
    uint16 bridgeType,
    uint256 chainId,
    bytes32 remoteRecipient,
    bytes32 whitelabel,
    bytes calldata bridgeParams
)
    external
    payable
    returns (uint256 assets, bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`shares`|`uint256`|The exact number of shares to mint|
|`bridgeType`|`uint16`|The type of bridge to use|
|`chainId`|`uint256`|The destination chain ID|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|
|`whitelabel`|`bytes32`|The whitelabeled unit token address on the destination chain|
|`bridgeParams`|`bytes`|Additional parameters required by the bridge|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited|
|`messageId`|`bytes32`|The bridge message ID for tracking|


### depositAndPredeposit

Deposits assets and predeposits the resulting shares for later bridging

Predeposited shares can be bridged later via the bridge coordinator


```solidity
function depositAndPredeposit(
    IERC20 asset,
    uint256 assets,
    bytes32 chainNickname,
    bytes32 remoteRecipient
)
    external
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`assets`|`uint256`|The amount of assets to deposit|
|`chainNickname`|`bytes32`|A human-readable identifier for the destination chain|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of shares minted and predeposited|


### mintAndPredeposit

Mints a specific amount of shares and predeposits them for later bridging

Predeposited shares can be bridged later via the bridge coordinator


```solidity
function mintAndPredeposit(
    IERC20 asset,
    uint256 shares,
    bytes32 chainNickname,
    bytes32 remoteRecipient
)
    external
    returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit (USDC, USDT, or USDS)|
|`shares`|`uint256`|The exact number of shares to mint|
|`chainNickname`|`bytes32`|A human-readable identifier for the destination chain|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited|


### _deposit

Internal function to handle asset deposits into the appropriate vault


```solidity
function _deposit(
    IERC20 asset,
    address whitelabel,
    uint256 assets,
    address receiver
)
    internal
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit|
|`whitelabel`|`address`|The whitelabeled unit token address, or address(0) for standard units|
|`assets`|`uint256`|The amount of assets to deposit|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The number of shares minted|


### _mint

Internal function to mint a specific amount of shares by depositing assets


```solidity
function _mint(
    IERC20 asset,
    address whitelabel,
    uint256 shares,
    address receiver
)
    internal
    returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset`|`IERC20`|The ERC20 token to deposit|
|`whitelabel`|`address`|The whitelabeled unit token address, or address(0) for standard units|
|`shares`|`uint256`|The exact number of shares to mint|
|`receiver`|`address`|The address that will receive the minted shares|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of assets that were deposited|


### _bridge

Internal function to bridge Generic units to another chain


```solidity
function _bridge(
    uint16 bridgeType,
    uint256 chainId,
    address onBehalf,
    bytes32 remoteRecipient,
    bytes32 whitelabel,
    uint256 units,
    bytes calldata bridgeParams
)
    internal
    returns (bytes32 messageId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The type of bridge to use|
|`chainId`|`uint256`|The destination chain ID|
|`onBehalf`|`address`|The address initiating the bridge operation|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain|
|`whitelabel`|`bytes32`|The whitelabeled unit token address on the destination chain|
|`units`|`uint256`|The number of units to bridge|
|`bridgeParams`|`bytes`|Additional parameters required by the bridge|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`messageId`|`bytes32`|The bridge message ID for tracking|


### _predeposit

Internal function to predeposit Generic units for later bridging


```solidity
function _predeposit(
    bytes32 chainNickname,
    address onBehalf,
    bytes32 remoteRecipient,
    uint256 units
)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`chainNickname`|`bytes32`|A human-readable identifier for the destination chain|
|`onBehalf`|`address`|The address initiating the predeposit operation|
|`remoteRecipient`|`bytes32`|The recipient address on the destination chain|
|`units`|`uint256`|The number of units to predeposit|


## Errors
### NoVaultForAsset
Thrown when no vault exists for the specified asset


```solidity
error NoVaultForAsset();
```

### AssetMismatch
Thrown when the vault's asset doesn't match the provided asset


```solidity
error AssetMismatch();
```

### ZeroAssets
Thrown when zero assets are specified for deposit


```solidity
error ZeroAssets();
```

### ZeroShares
Thrown when zero shares are specified for minting


```solidity
error ZeroShares();
```

### ZeroReceiver
Thrown when the receiver address is zero


```solidity
error ZeroReceiver();
```

### MintAmountMismatch
Thrown when the actual mint amount doesn't match the expected amount


```solidity
error MintAmountMismatch();
```

