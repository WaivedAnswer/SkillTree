import { openDatabase } from "expo-sqlite";

const tableName = 'lesson';

const executeSql = (db, query) => {
    return db.transaction((tx) => {
        tx.executeSql(query);
      });
};

export const getDBConnection = async () => {
    return openDatabase("lesson.db");
};

export const createTable = async (db) => {
    console.log("TABLE CREATE");
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

    executeSql(db, query);
};



export const getLessons = async (db) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    try {
      console.log("GET LESSONS");
      db.transaction( (tx) => {
        tx.executeSql(`SELECT rowid as id,value FROM ${tableName}`, [] , (_, results) => {
          const todoItems = [];
          results.rows._array.forEach(item => todoItems.push(item));
          return resolve(todoItems);
        });
      });
    } catch (error) {
      console.log("FAIL");
      console.error(error);
      reject(error);
    }
  });
};

export const saveLessons = async (db, todoItems) => {
    console.log("SAVE LESSONS");
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return executeSql(db, insertQuery);
};

export const deleteTable = async (db) => {
  const query = `drop table ${tableName}`;

  await executeSql(db, query);
};