import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
    "courses_db",
    "appuser",
    "apppass",
    {
        host: "127.0.0.1",
        port: 3306,
        dialect: "mysql",
    }
);

const Course = sequelize.define("Courses", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    hours: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
})

async function createDbAndTables() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log("The table was created successfully.");
    } catch (err) {
        console.log({ erroe: err.message });
    }
}

async function addCourse(name, hours, is_active = true) {
    const course = await Course.create({ name, hours, is_active })
    console.log(`Added course with id = ${course.id}`);
}

async function getActiveCourses() {
    const activeCourses = await Course.findAll({
        where:{
            is_active: true
        }
    })
    return activeCourses
}

async function main() {
  await createDbAndTables();
  await addCourse("SQL Basics", 20, true);
  await addCourse("Python Intro", 30, true);
  await addCourse("Legacy System", 10, false);
  const activeCourses = await getActiveCourses()
  console.log("Active courses: ");
  for (const course of activeCourses) {
    console.log(`${course.id}: ${course.name} (${course.hours} hours, active = ${course.is_active})`);
  }
  
}

main();
