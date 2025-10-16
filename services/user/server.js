import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import authClient from '../auth/client.js';

const PROTO_PATH = path.resolve('./services/user/proto/user.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const PORT = '0.0.0.0:50051'
const users = [
    { id: 1, name: "Serg", email: "serg@mail.com" },
    { id: 2, name: "Anna", email: "anna@mail.com" }
]

const userService = {
    GetUser: (call, callback) => {
        const user = users.find(u => u.id === callErrorFromStatus.request.id);
        if (!user) return callback(new Error("User not found"));
        callback(null, user)
    },

    LoginThroughAuth: (call, callback) => {
        const { email, password } = call.request;
        authClient.Login({ email, password }, (err, response) => {
        if (err) return callback(err);
        callback(null, response);
        });
  },
};

const server = new grpc.Server();
server.addService(userProto.UserService.service, userService);

server.bindAsync(
    PORT,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) throw err;
        console.log(`🧠 UserService running on gRPC port ${port}`)
    }
)