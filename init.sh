#!/bin/bash

cp -r prisma_backup/migrations prisma/ && cp prisma_backup/schema.prisma prisma/ && npx prisma migrate deploy