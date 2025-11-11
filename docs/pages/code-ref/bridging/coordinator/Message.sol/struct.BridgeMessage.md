# BridgeMessage
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/coordinator/Message.sol)

Structure representing the data for a bridge operation


```solidity
struct BridgeMessage {
bytes32 sender;
bytes32 recipient;
bytes32 sourceWhitelabel;
bytes32 destinationWhitelabel;
uint256 amount;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`bytes32`|The sender address on the source chain (as bytes32)|
|`recipient`|`bytes32`|The recipient address on the destination chain (as bytes32)|
|`sourceWhitelabel`|`bytes32`|The whitelabeled unit token address on the source chain (as bytes32)|
|`destinationWhitelabel`|`bytes32`|The whitelabeled unit token address on the destination chain (as bytes32)|
|`amount`|`uint256`|The amount of tokens to bridge|

