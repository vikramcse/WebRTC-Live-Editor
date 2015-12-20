(function() {
	'use strict';

	var peer = new Peer({key: '7qgkbddkebi6bt9'});
	var conn;

	peer.on('open', function(id) {
		$('#peer-id').text(id);
	});

	peer.on('connection', function(c) {
		console.log("connected");
		connect(c);
	});

	peer.on('disconnected', function(c) {
		console.log("disconnected");
		peer.disconnect();
	});

	var connect = function(c) {
		conn = c;
		$('#receiver-id').val(conn.peer);
		$('#receiver-id').prop('disabled', true);
		$('#progess').width('100%');

		conn.on('data', function(data) {
			var str = $('#area').val();
			if(data === 8)
				$('#area').val(str.substring(0, str.length - 1));
			else
				$('#area').val($('#area').val() + data);
		});
	};

	$().ready(function() {
		$('#connect').click(function() {
			$('#progess').width('50%');
			var c = peer.connect($('#receiver-id').val());
			c.on('open', function() {
				connect(c);
			});
		});

		$('#disconnect').click(function() {
			$('#progess').width('50%');
			console.log('disconnect');
			peer.disconnect();
		});

		$('#area').keyup(function(e) {
			var ev = e || window.event
			var ascii = ev.keyCode || ev.which;
			var charCode = String.fromCharCode(ascii);
			if(ascii === 8)
				conn.send(8);
			else
				conn.send(charCode);
		});
	});
}());