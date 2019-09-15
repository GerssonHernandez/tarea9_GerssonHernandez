let socket = io();

let escape = (html) => {
    return $('<div>').text(html).html();
};



$('#login').modal({ dismissible: false }).submit((e) => {
    e.preventDefault();
    let user = $('#login input').val();


    if (!user) return;
    cookies({ user });
    $('#login').modal('close');
    socket.emit('login', user);
    setTimeout(() => { $('#message').focus(); }, 500);
});

if (cookies('user')) {
    socket.emit('login', cookies('user'));
    setTimeout(() => { $('#message').focus(); }, 500);
} else {
    $('#login').modal('open');
}

$('.logout').click(() => {
    cookies({ user: null });
    window.location.reload();
});



// MENSAJES


let add = (html) => {
    var toScroll = $('.messages').prop("scrollHeight") - 50 < $('.messages').scrollTop() + $('.messages').height();
    $('.messages').append(html);


    if (toScroll) {
        $('.messages').stop(true).animate({
            scrollTop: $('.messages').prop("scrollHeight")
        }, 500);
    }
};


$('form.message').submit((e) => {
    e.preventDefault();
    let $input = $(e.target).find('input');
    let text = $input.val();

    $input.val('');

    socket.emit('message', text);
});


socket.on('login', (message) => {
    add('<div class="msg login">\
    <span class="user">' + escape(message.user) + '</span> logged in.\
  </div>');
});

socket.on('message', (message) => {
    add('<div class="msg">\
    <span class="user">' + escape(message.user) + ':</span> \
    <span class="msg">' + escape(message.text) + '</span>\
  </div>');
});

socket.on('logout', (message) => {
    add('<div class="msg logout">\
    <span class="user">' + escape(message.user) + '</span> logged out.\
  </div>');
});