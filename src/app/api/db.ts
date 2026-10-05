import { Pool } from 'pg';

export const pool = new Pool({
  connectionString:
    process.env['DATABASE_URL'] ?? 'postgresql://fitness:fitness@localhost:5432/fitness',
});

const r = await pool.query('SELECT NOW()');
console.log(r.rows[0]);
