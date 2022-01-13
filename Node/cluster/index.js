const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// console.log(cluster)
if (cluster.isMaster) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    console.log(cluster.worker.id)
  }).listen(8000, function() {
      console.log('ready')
  });
}