export class HttpError extends Error { constructor(status, message, code='REQUEST_FAILED') { super(message); this.status=status; this.code=code; } }
export const asyncHandler = fn => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next);
export function errorHandler(err, req, res, next) {
  const status = Number.isInteger(err.status) ? err.status : 500;
  if (status >= 500) console.error(JSON.stringify({level:'error', requestId:req.id, message:err.message}));
  res.status(status).json({ error:{ code:err.code || 'INTERNAL_ERROR', message:status >= 500 ? 'An unexpected error occurred' : err.message }, requestId:req.id });
}
