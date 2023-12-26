import * as SQLite from "expo-sqlite";

export default class DatabaseService {
  static async openConnection() {
    try {
      //connect to db
      const db = SQLite.openDatabase("bills.db");
      return db;
    } catch (error) {
      console.log(error);
    }
  }

  static async createTable(db) {
    try {
      //create table with images, title and amount columns
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT NOT NULL, title TEXT NOT NULL, amount REAL);"
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
}
