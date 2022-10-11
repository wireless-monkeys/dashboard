// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "dashboard-service.proto" (package "api", syntax proto3)
// tslint:disable
import { Empty } from "./utils";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * @generated from protobuf message api.GetNumberOfPeopleRequest
 */
export interface GetNumberOfPeopleRequest {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp start_time = 1;
     */
    startTime?: Timestamp;
    /**
     * @generated from protobuf field: google.protobuf.Timestamp end_time = 2;
     */
    endTime?: Timestamp;
    /**
     * @generated from protobuf field: int32 interval_minutes = 3;
     */
    intervalMinutes: number;
}
/**
 * @generated from protobuf message api.GetNumberOfPeopleResponse
 */
export interface GetNumberOfPeopleResponse {
    /**
     * @generated from protobuf field: repeated api.NumberOfPeopleRow rows = 1;
     */
    rows: NumberOfPeopleRow[];
}
/**
 * @generated from protobuf message api.NumberOfPeopleRow
 */
export interface NumberOfPeopleRow {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp timestamp = 1;
     */
    timestamp?: Timestamp;
    /**
     * @generated from protobuf field: int64 number_of_people = 2;
     */
    numberOfPeople: bigint;
}
/**
 * @generated from protobuf message api.CameraResponse
 */
export interface CameraResponse {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp timestamp = 1;
     */
    timestamp?: Timestamp;
    /**
     * @generated from protobuf field: bytes image = 2;
     */
    image: Uint8Array;
    /**
     * @generated from protobuf field: int64 number_of_people = 3;
     */
    numberOfPeople: bigint;
}
// @generated message type with reflection information, may provide speed optimized methods
class GetNumberOfPeopleRequest$Type extends MessageType<GetNumberOfPeopleRequest> {
    constructor() {
        super("api.GetNumberOfPeopleRequest", [
            { no: 1, name: "start_time", kind: "message", T: () => Timestamp },
            { no: 2, name: "end_time", kind: "message", T: () => Timestamp },
            { no: 3, name: "interval_minutes", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<GetNumberOfPeopleRequest>): GetNumberOfPeopleRequest {
        const message = { intervalMinutes: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetNumberOfPeopleRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetNumberOfPeopleRequest): GetNumberOfPeopleRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp start_time */ 1:
                    message.startTime = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.startTime);
                    break;
                case /* google.protobuf.Timestamp end_time */ 2:
                    message.endTime = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.endTime);
                    break;
                case /* int32 interval_minutes */ 3:
                    message.intervalMinutes = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetNumberOfPeopleRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp start_time = 1; */
        if (message.startTime)
            Timestamp.internalBinaryWrite(message.startTime, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* google.protobuf.Timestamp end_time = 2; */
        if (message.endTime)
            Timestamp.internalBinaryWrite(message.endTime, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* int32 interval_minutes = 3; */
        if (message.intervalMinutes !== 0)
            writer.tag(3, WireType.Varint).int32(message.intervalMinutes);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.GetNumberOfPeopleRequest
 */
export const GetNumberOfPeopleRequest = new GetNumberOfPeopleRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class GetNumberOfPeopleResponse$Type extends MessageType<GetNumberOfPeopleResponse> {
    constructor() {
        super("api.GetNumberOfPeopleResponse", [
            { no: 1, name: "rows", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => NumberOfPeopleRow }
        ]);
    }
    create(value?: PartialMessage<GetNumberOfPeopleResponse>): GetNumberOfPeopleResponse {
        const message = { rows: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<GetNumberOfPeopleResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: GetNumberOfPeopleResponse): GetNumberOfPeopleResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated api.NumberOfPeopleRow rows */ 1:
                    message.rows.push(NumberOfPeopleRow.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: GetNumberOfPeopleResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated api.NumberOfPeopleRow rows = 1; */
        for (let i = 0; i < message.rows.length; i++)
            NumberOfPeopleRow.internalBinaryWrite(message.rows[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.GetNumberOfPeopleResponse
 */
export const GetNumberOfPeopleResponse = new GetNumberOfPeopleResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class NumberOfPeopleRow$Type extends MessageType<NumberOfPeopleRow> {
    constructor() {
        super("api.NumberOfPeopleRow", [
            { no: 1, name: "timestamp", kind: "message", T: () => Timestamp },
            { no: 2, name: "number_of_people", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<NumberOfPeopleRow>): NumberOfPeopleRow {
        const message = { numberOfPeople: 0n };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<NumberOfPeopleRow>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: NumberOfPeopleRow): NumberOfPeopleRow {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp timestamp */ 1:
                    message.timestamp = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.timestamp);
                    break;
                case /* int64 number_of_people */ 2:
                    message.numberOfPeople = reader.int64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: NumberOfPeopleRow, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp timestamp = 1; */
        if (message.timestamp)
            Timestamp.internalBinaryWrite(message.timestamp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* int64 number_of_people = 2; */
        if (message.numberOfPeople !== 0n)
            writer.tag(2, WireType.Varint).int64(message.numberOfPeople);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.NumberOfPeopleRow
 */
export const NumberOfPeopleRow = new NumberOfPeopleRow$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CameraResponse$Type extends MessageType<CameraResponse> {
    constructor() {
        super("api.CameraResponse", [
            { no: 1, name: "timestamp", kind: "message", T: () => Timestamp },
            { no: 2, name: "image", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 3, name: "number_of_people", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<CameraResponse>): CameraResponse {
        const message = { image: new Uint8Array(0), numberOfPeople: 0n };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CameraResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CameraResponse): CameraResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp timestamp */ 1:
                    message.timestamp = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.timestamp);
                    break;
                case /* bytes image */ 2:
                    message.image = reader.bytes();
                    break;
                case /* int64 number_of_people */ 3:
                    message.numberOfPeople = reader.int64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CameraResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp timestamp = 1; */
        if (message.timestamp)
            Timestamp.internalBinaryWrite(message.timestamp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* bytes image = 2; */
        if (message.image.length)
            writer.tag(2, WireType.LengthDelimited).bytes(message.image);
        /* int64 number_of_people = 3; */
        if (message.numberOfPeople !== 0n)
            writer.tag(3, WireType.Varint).int64(message.numberOfPeople);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.CameraResponse
 */
export const CameraResponse = new CameraResponse$Type();
/**
 * @generated ServiceType for protobuf service api.DashboardService
 */
export const DashboardService = new ServiceType("api.DashboardService", [
    { name: "GetNumberOfPeople", options: {}, I: GetNumberOfPeopleRequest, O: GetNumberOfPeopleResponse },
    { name: "SubscribeCamera", serverStreaming: true, options: {}, I: Empty, O: CameraResponse }
]);
