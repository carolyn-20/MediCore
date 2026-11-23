import {Router} from 'express';
import {prisma} from '../lib/prisma.js';
import {asyncHandler} from '../lib/errors.js';
import {allow} from '../middleware/auth.js';
const r=Router();
r.get('/departments',allow('PATIENT','RECEPTIONIST','DOCTOR','NURSE','LAB_TECH','BILLING','ADMIN'),asyncHandler(async(req,res)=>res.json(await prisma.department.findMany({orderBy:{name:'asc'}}))));
r.get('/providers',allow('PATIENT','RECEPTIONIST','DOCTOR','NURSE','ADMIN'),asyncHandler(async(req,res)=>res.json(await prisma.provider.findMany({include:{department:{select:{id:true,name:true}}},orderBy:{name:'asc'}}))));
export default r;
