import 'dotenv/config';
import {Worker} from 'bullmq';
import {connection} from '../lib/queue.js';
const worker=new Worker('medicore-notifications',async job=>{
  const {channel,to,message}=job.data;
  // Deliberately a sandbox sink. Replace only with a verified test provider adapter.
  console.log(JSON.stringify({event:'SANDBOX_NOTIFICATION_DELIVERED',jobId:job.id,channel,to,message,provider:'console-sandbox'}));
  return {accepted:true,provider:'console-sandbox'};
},{connection,concurrency:5});
worker.on('failed',(job,error)=>console.error(JSON.stringify({event:'NOTIFICATION_JOB_FAILED',jobId:job?.id,error:error.message,attemptsMade:job?.attemptsMade})));
async function stop(){await worker.close();await connection.quit();process.exit(0)}
process.on('SIGTERM',stop);process.on('SIGINT',stop);
