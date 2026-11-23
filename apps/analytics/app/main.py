from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
app = FastAPI(title='MediCore Analytics API', version='1.0.0', description='Operational metrics over synthetic healthcare data. Not for diagnosis or treatment.')
class AppointmentRow(BaseModel):
    scheduled_minutes: int = Field(gt=0, le=1440)
    wait_minutes: int = Field(ge=0, le=10080)
    status: str
class LabRow(BaseModel):
    ordered_at: datetime
    resulted_at: Optional[datetime] = None
    test_code: str = Field(min_length=1, max_length=40)
@app.get('/healthz')
def health(): return {'status':'ok'}
@app.post('/analytics/appointments')
def appointment_metrics(rows: list[AppointmentRow]):
    if not rows: raise HTTPException(400, 'At least one appointment row is required')
    total=len(rows); completed=sum(r.status.upper()=='COMPLETED' for r in rows)
    return {'total':total,'completed':completed,'utilization_percent':round(completed/total*100,2),'average_wait_minutes':round(sum(r.wait_minutes for r in rows)/total,2)}
@app.post('/analytics/labs')
def lab_metrics(rows: list[LabRow]):
    durations=[]
    for r in rows:
        if r.resulted_at:
            if r.resulted_at < r.ordered_at: raise HTTPException(400, f'Result timestamp precedes order for {r.test_code}')
            durations.append((r.resulted_at-r.ordered_at).total_seconds()/3600)
    return {'orders':len(rows),'completed':len(durations),'pending':len(rows)-len(durations),'average_turnaround_hours':round(sum(durations)/len(durations),2) if durations else None}
@app.post('/analytics/population')
def population_summary(rows: list[dict]):
    if not rows: raise HTTPException(400,'At least one synthetic row is required')
    return {'synthetic_records':len(rows),'disclaimer':'Aggregate operational summary only; no clinical inference.'}
