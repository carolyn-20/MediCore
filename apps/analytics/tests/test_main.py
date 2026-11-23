from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_health(): assert client.get('/healthz').json()['status']=='ok'
def test_appointment_metrics():
    r=client.post('/analytics/appointments',json=[{'scheduled_minutes':30,'wait_minutes':10,'status':'COMPLETED'},{'scheduled_minutes':30,'wait_minutes':20,'status':'BOOKED'}]);assert r.status_code==200;assert r.json()['completed']==1;assert r.json()['average_wait_minutes']==15

def test_reject_invalid_wait():
    r=client.post('/analytics/appointments',json=[{'scheduled_minutes':30,'wait_minutes':-1,'status':'BOOKED'}]);assert r.status_code==422

def test_lab_time_order():
    r=client.post('/analytics/labs',json=[{'ordered_at':'2026-01-02T10:00:00Z','resulted_at':'2026-01-02T09:00:00Z','test_code':'CBC'}]);assert r.status_code==400
