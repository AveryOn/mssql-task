
-- Извлечение данных по контейнерам
DECLARE @json_result NVARCHAR(MAX) = '[';

SELECT @json_result += 
    '{' +
    '"id": "' + CONVERT(NVARCHAR(36), id) + '",' +
    '"number": ' + CONVERT(NVARCHAR(10), number) + ',' +
    '"type": "' + type + '",' +
    '"length": ' + CONVERT(NVARCHAR(10), length) + ',' +
    '"width": ' + CONVERT(NVARCHAR(10), width) + ',' +
    '"height": ' + CONVERT(NVARCHAR(10), height) + ',' +
    '"weight": ' + CONVERT(NVARCHAR(10), weight) + ',' +
    '"is_empty": ' + CASE WHEN is_empty = 1 THEN 'true' ELSE 'false' END + ',' +
    '"receipt_date": "' + CONVERT(NVARCHAR(20), receipt_date, 120) + '"' +
    '},'
FROM containers;

SET @json_result = LEFT(@json_result, LEN(@json_result) - 1) + ']';
SELECT @json_result AS json_result;




-- Извлечение данных по операциям
DECLARE @containerID UNIQUEIDENTIFIER = @container_id;
DECLARE @json_result NVARCHAR(MAX) = '[';

SELECT @json_result += 
    CASE 
        WHEN LEN(@json_result) > 1 THEN ',' 
        ELSE '' 
    END + 
    '{' +
    '"id": "' + CONVERT(NVARCHAR(36), id) + '",' +
    '"container_id": "' + CONVERT(NVARCHAR(36), @containerID) + '",' +
    '"start_date": "' + CONVERT(NVARCHAR(20), start_date, 120) + '",' +
    '"end_date": "' + CONVERT(NVARCHAR(20), end_date, 120) + '",' +
    '"type": "' + type + '",' +
    '"operator_fullname": "' + operator_fullname + '",' +
    '"inspection_place": "' + inspection_place + '"' +
    '}'
FROM operations
WHERE container_id = @containerID;

SET @json_result = @json_result + ']';
SELECT @json_result AS json_result;