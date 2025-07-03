#!/bin/bash

echo '🟢 CLIENTES'
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{"body": {"nombre": "Ana", "apellido": "G\u00f3mez", "email": "ana@example.com", "telefono": "0999999999"}}'

curl http://localhost:3000/clientes
curl http://localhost:3000/clientes/1
curl -X PATCH http://localhost:3000/clientes/1 \
  -H "Content-Type: application/json" \
  -d '{"telefono": "0988888888"}'
curl -X DELETE http://localhost:3000/clientes/1


echo '🟢 METODOPAGO'
curl -X POST http://localhost:3000/metodopago \
  -H "Content-Type: application/json" \
  -d '{"tipo": "Tarjeta", "numeroTarjeta": "1234567812345678", "nombreTitular": "Ana G\u00f3mez", "fechaExpiracion": "11/27"}'

curl http://localhost:3000/metodopago
curl http://localhost:3000/metodopago/1
curl -X PATCH http://localhost:3000/metodopago/1 \
  -H "Content-Type: application/json" \
  -d '{"tipo": "PayPal"}'
curl -X DELETE http://localhost:3000/metodopago/1


echo '🟢 RECLAMOS'
curl -X POST http://localhost:3000/reclamos \
  -H "Content-Type: application/json" \
  -d '{"asunto": "Problema con entrega", "descripcion": "No lleg\u00f3 el producto", "estado": "pendiente", "fecha": "2025-06-25"}'

curl http://localhost:3000/reclamos
curl http://localhost:3000/reclamos/1
curl -X PATCH http://localhost:3000/reclamos/1 \
  -H "Content-Type: application/json" \
  -d '{"estado": "resuelto"}'
curl -X DELETE http://localhost:3000/reclamos/1

