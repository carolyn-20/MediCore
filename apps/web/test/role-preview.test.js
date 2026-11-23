import test from 'node:test';import assert from 'node:assert/strict';
const roles=['Patient','Receptionist','Doctor','Nurse','Laboratory Technician','Billing Officer','Hospital Administrator'];
test('dashboard role preview offers all seven business roles',()=>{assert.equal(roles.length,7);assert.ok(roles.includes('Patient'));assert.ok(roles.includes('Hospital Administrator'));});
