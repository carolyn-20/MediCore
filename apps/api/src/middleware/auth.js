import jwt from 'jsonwebtoken';
import { HttpError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';
const roles = ['PATIENT','RECEPTIONIST','DOCTOR','NURSE','LAB_TECH','BILLING','ADMIN'];
export function authenticate(req,res,next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i,'');
    if (!token) throw new HttpError(401,'Authentication required','UNAUTHENTICATED');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(payload.role) || payload.revoked) throw new HttpError(401,'Invalid session','INVALID_SESSION');
    req.user = { id:payload.sub, role:payload.role, patientId:payload.patientId || null };
    next();
  } catch (e) { next(e instanceof HttpError ? e : new HttpError(401,'Invalid or expired token','INVALID_TOKEN')); }
}
export const allow = (...allowed) => (req,res,next) => allowed.includes(req.user?.role) ? next() : next(new HttpError(403,'Insufficient permissions','FORBIDDEN'));
export async function requirePatientAccess(req,res,next) {
  try {
    const patientId = req.params.patientId || req.body.patientId;
    if (!patientId) return next();
    if (req.user.role === 'ADMIN') return next();
    if (req.user.role === 'PATIENT' && req.user.patientId !== patientId) throw new HttpError(403,'You cannot access another patient record','PATIENT_SCOPE_DENIED');
    if (req.user.role === 'DOCTOR' || req.user.role === 'NURSE') {
      const link = await prisma.encounter.findFirst({where:{patientId, provider:{userId:req.user.id}}});
      if (!link) throw new HttpError(403,'No care relationship permits this access','CARE_RELATIONSHIP_REQUIRED');
    }
    next();
  } catch(e) { next(e); }
}
