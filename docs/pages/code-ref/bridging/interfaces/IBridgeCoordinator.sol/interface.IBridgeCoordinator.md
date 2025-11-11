# IBridgeCoordinator
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/interfaces/IBridgeCoordinator.sol)

Interface for coordinating cross-chain bridge operations for unit tokens

Manages routing between different bridge adapters and handles inbound/outbound bridging


## Functions
### settleInboundMessage

Settles an inbound bridge operation by releasing (unlocking or minting) Generic units to the recipient

Called by bridge adapters when receiving cross-chain messages to complete bridge-in operations


```solidity
function settleInboundMessage(
    uint16 bridgeType,
    uint256 chainId,
    bytes32 remoteSender,
    bytes calldata message,
    bytes32 messageId
)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`bridgeType`|`uint16`|The identifier for the bridge protocol that received the message|
|`chainId`|`uint256`|The source chain ID where the bridge operation originated|
|`remoteSender`|`bytes32`|The original sender address on the source chain (encoded as bytes32)|
|`message`|`bytes`|The encoded bridge message containing recipient and amount data|
|`messageId`|`bytes32`|Unique identifier for tracking the cross-chain message|


