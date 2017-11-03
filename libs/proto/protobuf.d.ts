
declare module dcodeIO.ProtoBuf{
    export function loadJson(json, builder?, filename?):Builder;
    export function loadJsonFile(filename, callback?, builder?):Builder;
    export function newBuilder(options):Builder;
    export function loadProto(proto, builder?, filename?):Builder;
    export function protoFromString(proto, builder?, filename?):Builder;
    export function loadProtoFile(filename, callback?, builder?):Builder;
    export function protoFromFile(filename, callback?, builder?):Builder;

    export class Message{
        constructor(values?, var_args?);
        add(key, value, noAssert?):Message;
        set(keyOrObj, value, noAssert?):Message;
        get(key, noAssert?);

        toArrayBuffer():ArrayBuffer;
        calculate():number;
        encodeDelimited(buffer);

        encodeAB():ArrayBuffer;
        encode();
        encodeDelimited();
        encodeNB();
        toBuffer();
        encode64();
        toBase64();
        encodeHex();
        toHex();
        encodeJSON();

        static encode(data, buffer, noVerify?);
        static decode(buffer, enc?):Message;
        static decodeDelimited(buffer, enc?):Message;
        static decode64(str):Message;
        static decodeHex(str):Message;
        static decodeJSON(str):Message;
    }
    export class Builder{
        build(path:string);
    }
}