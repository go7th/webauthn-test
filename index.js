const { Fido2Lib } = require("fido2-lib");

// create a new instance of the library
var f2l = new Fido2Lib();

var f2l = new Fido2Lib({
    timeout: 42,
    rpId: "example.com",
    rpName: "ACME",
    rpIcon: "https://example.com/logo.png",
    challengeSize: 128,
    attestation: "none",
    cryptoParams: [-7, -257],
    authenticatorAttachment: "platform",
    authenticatorRequireResidentKey: false,
    authenticatorUserVerification: "required"
});

// 注册

var registrationOptions = await f2l.attestationOptions();

// make sure to add registrationOptions.user.id
// save the challenge in the session information...
// send registrationOptions to client and pass them in to `navigator.credentials.create()`...
// get response back from client (clientAttestationResponse)

var attestationExpectations = {
    challenge: "33EHav-jZ1v9qwH783aU-j0ARx6r5o-YHh-wd7C6jPbd7Wh6ytbIZosIIACehwf9-s6hXhySHO-HHUjEwZS29w",
    origin: "https://localhost:8443",
    factor: "either"
};
var regResult = await f2l.attestationResult(clientAttestationResponse, attestationExpectations); // will throw on error

// registration complete!
// save publicKey and counter from regResult to user's info for future authentication calls

// 登录认证
var authnOptions = await f2l.assertionOptions();

// save the challenge in the session information...
// send authnOptions to client and pass them in to `navigator.credentials.get()`...
// get response back from client (clientAssertionResponse)

var assertionExpectations = {
    challenge: "eaTyUNnyPDDdK8SNEgTEUvz1Q8dylkjjTimYd5X7QAo-F8_Z1lsJi3BilUpFZHkICNDWY8r9ivnTgW7-XZC3qQ",
    origin: "https://localhost:8443",
    factor: "either",
    publicKey: "-----BEGIN PUBLIC KEY-----\n" +
        "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAERez9aO2wBAWO54MuGbEqSdWahSnG\n" +
        "MAg35BCNkaE3j8Q+O/ZhhKqTeIKm7El70EG6ejt4sg1ZaoQ5ELg8k3ywTg==\n" +
        "-----END PUBLIC KEY-----\n",
    prevCounter: 362
};
var authnResult = await f2l.attestationResult(clientAssertionResponse, assertionExpectations); // will throw on error

// authentication complete!
