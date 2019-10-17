SELECT
    doc.date AS date,
    docType.name AS docName,
    doc.id AS id,
    product.image AS image,
    product.name AS productName,
    product.price AS price,
    rws.quantity AS quantity,
    product.removed AS removed
FROM 
    products product
LEFT JOIN rows rws ON 
    rws.productId = product.id
LEFT JOIN docs doc ON
    doc.id = rws.docId
LEFT JOIN  docTypes docType ON
    docType.id = doc.typeId
WHERE product.removed != 1
ORDER BY doc.date