
const { Pool } = require('pg');
const args = process.argv.slice(2);
const cohort = args[0];
const limit = args[1] || 5;

const pool = new Pool({
  user: 'vagrant',
  password: 'vagrant', 
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
  SELECT students.id as student_id, students.name as name, cohorts.name as cohort
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `;
const values = [`%${cohort}%`, limit];

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));