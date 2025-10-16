import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import jwt from 'jsonwebtoken';

const PROTO_PATH = path.resolve('./services/auth/proto/auth.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

const PORT = '0.0.0.0:50052';
const users = [
    { id: 1, email: "serg@mail.com", password: '123456', name: "Serg" }
];

const authService = {
    Login: (call, callback) => {
        const { email, password } = call.request;
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) { return callback(null, { success: false, message: "Invalid credentials" }) };

        const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expicallbackIn: '1h' });
        callback(null, { success: true, message: "Logged in successfully", token });
    }
};

const server = new grpc.Server();
server.addService(authProto.AuthService.service, authService);

server.bindAsync(
    PORT,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) throw err;
        console.log(`🔐 AuthService running on gRPC port ${port}`);
    }
);