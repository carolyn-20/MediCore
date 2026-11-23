"""Small synthetic CSV processor for Assessment 05. No clinical interpretation."""
import csv
from pathlib import Path
from collections import Counter

def process_lab_csv(path: str):
    rows=[]
    with Path(path).open(newline='',encoding='utf-8') as f:
        for line,row in enumerate(csv.DictReader(f),start=2):
            code=(row.get('test_code') or '').strip()
            unit=(row.get('unit') or '').strip()
            value=(row.get('value') or '').strip()
            if not code or not unit or not value:
                raise ValueError(f'Row {line}: test_code, unit and value are required')
            try: numeric=float(value)
            except ValueError: raise ValueError(f'Row {line}: value must be numeric')
            rows.append({'test_code':code,'unit':unit,'value':numeric})
    return {'rows_processed':len(rows),'test_counts':dict(Counter(r['test_code'] for r in rows)),'rows':rows}
