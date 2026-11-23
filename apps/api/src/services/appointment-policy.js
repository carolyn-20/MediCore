export function overlaps(a,b){return new Date(a.startsAt)<new Date(b.endsAt)&&new Date(a.endsAt)>new Date(b.startsAt);}
export function validateAppointmentWindow(startsAt,endsAt){const start=new Date(startsAt),end=new Date(endsAt);return Number.isFinite(start.getTime())&&Number.isFinite(end.getTime())&&end>start;}
