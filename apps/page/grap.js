var page = div();
page.innerHTML = grap;
function main(data) {
    render(page, {
        button,
        login() {
            cross("post", "https://github.com/session").form({
                commit: "Sign in",
                utf8: "✓",
                authenticity_token: "BgtsUt3eC5OmyMrVbjK4mMFJxoyFJCuDUIcI4HDLpIhACByB16TxqxjlEal2vVMRKaW8MtqKaXdH2C0cmR3EMw==",
                login: "yunxu1019",
                password: "3f2f21o2e",
                "webauthn-support": "supported",
                "required_field_9c32": "",
                "timestamp": "1566317611144",
                timestamp_secret: "b2f43b73e9bdffb42b5d193d0bcb22a23fd60e9b179d207d248e0c447bf74f5c"
            });
        },
        logout() {
            cross("post", "https://github.com/logout").form({
                utf8: "✓",
                authenticity_token: ""
            });
        }
    })
    return page;
}