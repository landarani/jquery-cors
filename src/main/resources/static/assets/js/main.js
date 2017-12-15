var jquery = $;
var defaultUsername = 'shahram';
function getToken(username) {
  jquery.get("/main/" + username).done(function(data) {
    jquery("#token").text(data);
  }).fail(function(err) {
    jquery("#error").text(JSON.stringify(res));
  });
}
function hello() {
  jquery.ajax("http://127.0.0.1:81/api/hello", {
    crossDomain : true,
    xhrFields : {
      withCredentials : true
    }
  }).always(function(res) {
    jquery("#response").text(JSON.stringify(res));
  });
}
function login() {
  var token = jquery("#token").text();
  var username = jquery("#username").val();
  jquery.ajax("http://127.0.0.1:81/login", {
    method : 'POST',
    crossDomain : true,
    dataType : 'text',
    data : {
      "username" : username,
      "jwt-token" : token,
    },
    xhrFields : {
      withCredentials : true
    },
  }).always(function(res) {
    jquery("#error").text(JSON.stringify(res));
  });
}
$(document).ready(function() {
  $('#username').val(defaultUsername);
  $('#refreshToken').on('click', function() {
    getToken(jquery('#username').val());
  });
  $('#login').on('click', function() {
    login();
  });
  $('#hello').on('click', function() {
    hello();
  });
  getToken(defaultUsername);
});
