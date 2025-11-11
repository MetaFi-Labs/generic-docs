# IMessageService
[Git Source](https://github.com/MetaFi-Labs/generic-bridging/blob/7a6c887bd2ad364f3a697790fb47993635f88840/src/interfaces/bridges/linea/IMessageService.sol)

Minimal interface for Linea's canonical message service used by the bridge adapter.


## Functions
### claimMessage

Claims a previously relayed message on the destination chain.


```solidity
function claimMessage(
    address from,
    address to,
    uint256 fee,
    uint256 value,
    address payable feeRecipient,
    bytes calldata callData,
    uint256 nonce
)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|Original sender on the source chain.|
|`to`|`address`|Target contract on the destination chain to execute the payload.|
|`fee`|`uint256`|Native fee charged by the message service for processing the claim.|
|`value`|`uint256`|Value (if any) forwarded to the target contract along with the call.|
|`feeRecipient`|`address payable`|Address receiving the settlement fee on the destination chain.|
|`callData`|`bytes`|Encoded call data forwarded to the target contract.|
|`nonce`|`uint256`|Unique identifier of the message being claimed.|


### sendMessage

Sends a message for transporting from the current chain to the destination chain.

Must be called with `msg.value == _fee + _value` if the payload forwards native ETH.


```solidity
function sendMessage(address _to, uint256 _fee, bytes calldata _calldata) external payable;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|Destination address on the remote chain.|
|`_fee`|`uint256`|Native fee charged on the origin chain.|
|`_calldata`|`bytes`|Encoded payload executed by the destination message service.|


### sender

Returns the address that initiated the current message.


```solidity
function sender() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The source address recorded by the message service.|


