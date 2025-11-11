# VaultManager
[Git Source](https://github.com/MetaFi-Labs/generic-protocol/blob/67cb029193a23b77ffeb3a4df225e716349c580c/src/controller/VaultManager.sol)

**Inherits:**
[BaseController](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/BaseController.sol/abstract.BaseController.md), [PriceFeedManager](/Users/naimashhab/Documents/crypto/generic-protocol/docs/src/src/controller/PriceFeedManager.sol/abstract.PriceFeedManager.md)

Manages vaults within Controller system

Abstract contract that handles vault registration, removal, and configuration
Uses a linked list structure for efficient vault management and iteration
Inherits from BaseController for access control and basic functionality


## State Variables
### VAULT_MANAGER_ROLE
Role identifier for vault management operations


```solidity
bytes32 public constant VAULT_MANAGER_ROLE = keccak256("VAULT_MANAGER_ROLE")
```


### SENTINEL_VAULTS
Sentinel address used as the head and tail of the vaults linked list


```solidity
address public constant SENTINEL_VAULTS = address(0x1)
```


## Functions
### __VaultManager_init

Initializes the VaultManager with an empty vaults linked list

Sets up the sentinel vault as the head of the linked list
This function should be called during contract initialization


```solidity
function __VaultManager_init() internal onlyInitializing;
```

### addVault

Adds a new vault to the system with specified settings

The vault is inserted at the beginning of the linked list for O(1) insertion


```solidity
function addVault(
    address vault,
    VaultSettings calldata settings,
    bool isMainVaultForAsset
)
    external
    onlyRole(VAULT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to add|
|`settings`|`VaultSettings`|The configuration settings for the vault|
|`isMainVaultForAsset`|`bool`|If true, sets this vault as the main vault for its asset|


### removeVault

Removes a vault from the system

Removes the vault from the linked list and clears its settings


```solidity
function removeVault(address vault, address prevVault) external onlyRole(VAULT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to remove|
|`prevVault`|`address`|The address of the vault that precedes this vault in the linked list|


### updateVaultSettings

Updates the settings for an existing vault

Note: It's possible to set settings that are incompatible with the current vault state
(e.g., maxCapacity < totalAssets). Such settings may prevent further deposits but
should not break existing functionality


```solidity
function updateVaultSettings(
    address vault,
    VaultSettings calldata settings
)
    external
    onlyRole(VAULT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to update|
|`settings`|`VaultSettings`|The new configuration settings for the vault|


### setMainVault

Sets the main vault for the asset managed by the specified vault

The specified vault must be registered


```solidity
function setMainVault(address vault) external onlyRole(VAULT_MANAGER_ROLE);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault to set as main for the asset|


### isVault

Checks if an address is a registered vault


```solidity
function isVault(address vault) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the address is a registered vault, false otherwise|


### vaults

Returns an array of all registered vault addresses

Iterates through the linked list to collect all vault addresses
The order matches the insertion order (most recently added vaults first)


```solidity
function vaults() public view returns (address[] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|Array containing all registered vault addresses|


### _vaultValue

Calculates the value of a specific amount of assets held in a vault


```solidity
function _vaultValue(address vault, uint256 normalizedAmount) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault|
|`normalizedAmount`|`uint256`|The amount of normalized assets to value|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The value of the specified asset amount in normalized decimals|


### _checkVaultSettings

Validates vault settings parameters


```solidity
function _checkVaultSettings(VaultSettings calldata settings) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`settings`|`VaultSettings`|The vault settings to validate|


### _vaultAsset

Retrieves the asset managed by a given vault


```solidity
function _vaultAsset(address vault) internal view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the asset managed by the vault, or address(0) if not a vault|


### _vaultsOverview

Gets a comprehensive overview of all vaults in the system

Iterates through all registered vaults to collect their data


```solidity
function _vaultsOverview(bool calculateTotalValue) internal view returns (VaultsOverview memory overview);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`calculateTotalValue`|`bool`|If true, calculates the total USD value of all assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`overview`|`VaultsOverview`|Complete overview struct with vault data and optionally total value|


## Events
### VaultAdded
Emitted when a new vault is added to the system


```solidity
event VaultAdded(address indexed vault, address indexed asset);
```

### VaultRemoved
Emitted when a vault is removed from the system


```solidity
event VaultRemoved(address indexed vault);
```

### VaultSettingsUpdated
Emitted when vault settings are updated


```solidity
event VaultSettingsUpdated(
    address indexed vault, uint256 maxCapacity, uint256 maxProportionality, uint256 minProportionality
);
```

### MainVaultForAssetUpdated
Emitted when the main vault for an asset is updated


```solidity
event MainVaultForAssetUpdated(address indexed asset, address indexed oldVault, address indexed newVault);
```

## Errors
### Vault_ControllerMismatch
Thrown when a vault's controller does not match this contract


```solidity
error Vault_ControllerMismatch();
```

### Vault_InvalidVault
Thrown when an invalid vault address is provided


```solidity
error Vault_InvalidVault();
```

### Vault_NoPriceFeedForAsset
Thrown when trying to add a vault for an asset without a price feed


```solidity
error Vault_NoPriceFeedForAsset();
```

### Vault_VaultNotEmpty
Thrown when trying to remove a vault that still contains assets


```solidity
error Vault_VaultNotEmpty();
```

### Vault_InvalidPrevVault
Thrown when the provided previous vault in the linked list is incorrect


```solidity
error Vault_InvalidPrevVault();
```

### Vault_InvalidMaxProportionality
Thrown when the maximum proportionality exceeds the allowed limit


```solidity
error Vault_InvalidMaxProportionality();
```

### Vault_InvalidMinProportionality
Thrown when the minimum proportionality exceeds the allowed limit


```solidity
error Vault_InvalidMinProportionality();
```

### Vault_MinProportionalityNotLessThanMax
Thrown when minimum proportionality is greater than maximum proportionality


```solidity
error Vault_MinProportionalityNotLessThanMax();
```

### Vault_AlreadyMainVaultForAsset
Thrown when trying to set a vault as the main vault for an asset it already is


```solidity
error Vault_AlreadyMainVaultForAsset();
```

## Structs
### VaultsOverview

```solidity
struct VaultsOverview {
    address[] vaults;
    uint256[] assets;
    VaultSettings[] settings;
    uint256 totalAssets;
    uint256 totalValue;
}
```

