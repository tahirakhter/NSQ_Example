const express = require('express')
const nsq = require('nsqjs')
const app = express()
const axios = require('axios');
const port = 3002

const reader = new nsq.Reader('Topic1', 'Channel1', {
	lookupdHTTPAddresses: ['127.0.0.1:4161', '127.0.0.1:4261']
})
reader.connect()

reader.on('error', err => {
	console.log('Error message', JSON.stringify(err))
})

reader.on('message', msg => {
	console.log('Received message [%s]: %s', msg.id, msg.body.toString())
	msg.finish()
})


let count = 1;
let msg;

function sendMessage() {
	msg = "message " + count + " from node2";
	setTimeout(() => {
		axios.post('http://localhost:4251/pub?topic=Topic1', { "text": msg })
			.then(response => {
				count = count + 1;
				sendMessage();
			})
			.catch(error => {
				sendMessage = false;
				console.log(error);
			});
	}, 5000);

}
sendMessage();

app.listen(port, () => console.log(`NSQ Consumer is listening on port ${port}!`))
