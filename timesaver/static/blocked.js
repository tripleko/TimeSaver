function create_rand_str(str_length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < str_length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var app = new Vue({
    el: "#app",
    data: {
        confirm_msg: confirm_msg + create_rand_str(rand_len),
    },
    methods: {
        checkText: function() {
            console.log("on");
            console.log(document.getElementById("txt-input").value);
            if(document.getElementById("txt-input").value.trim().toLowerCase() === this.confirm_msg.trim().toLowerCase()) {
                console.log("true, they're equal");
                fetch('../api/allow_request/', {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    redirect: "follow",
                    body: JSON.stringify({url: page_url})
                }).then(function (res) {
                    window.history.back();
                });
            }
            else {
                console.log("Incorrect");
            }
        }
    }
});
