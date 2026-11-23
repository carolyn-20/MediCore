import {Queue} from 'bullmq';
import IORedis from 'ioredis';
const connection=new IORedis(process.env.REDIS_URL||'redis://localhost:6379',{maxRetriesPerRequest:null});
export const notificationQueue=new Queue('medicore-notifications',{connection,defaultJobOptions:{attempts:5,backoff:{type:'exponential',delay:2000},removeOnComplete:1000,removeOnFail:false}});
export {connection};
