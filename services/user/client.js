import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve('./services/user/proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const PORT = 'localhost:50051';

const client = new userProto.UserService(
  PORT,
  grpc.credentials.createInsecure()
);

export default client;
