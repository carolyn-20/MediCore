import csv
import pytest
from app.processor import process_lab_csv

def test_processor_valid_csv(tmp_path):
    p=tmp_path/'labs.csv'
    with p.open('w',newline='') as f:
        w=csv.DictWriter(f,fieldnames=['test_code','unit','value']);w.writeheader();w.writerow({'test_code':'CBC','unit':'g/L','value':'12.5'})
    result=process_lab_csv(str(p));assert result['rows_processed']==1;assert result['test_counts']['CBC']==1

def test_processor_rejects_missing_unit(tmp_path):
    p=tmp_path/'labs.csv';p.write_text('test_code,unit,value\nCBC,,12.5\n')
    with pytest.raises(ValueError):process_lab_csv(str(p))
