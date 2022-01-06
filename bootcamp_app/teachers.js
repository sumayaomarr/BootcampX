const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'vagrant', 
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
JOIN students ON students.id = student_id
JOIN cohorts ON students.cohort_id = cohorts.id 
JOIN teachers ON teachers.id = teacher_id
WHERE cohorts.name = $1
GROUP BY teacher, cohort
ORDER BY teacher;`;

const values = [process.argv[2]];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));