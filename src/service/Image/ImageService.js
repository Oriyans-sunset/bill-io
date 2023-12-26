import DatabaseService from "../Database/DatabaseService";

export default class ImageService {
  static async saveToDatabase(imageUri, title, amount) {
    try {
      //save
      DatabaseService.openConnection().then((db) => {
        //create the table if it doesn't exist
        DatabaseService.createTable(db);

        //add the image
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO items (image, title, amount) VALUES (?, ?, ?)",
            [imageUri, title, amount]
          );
        }, null);
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllRows() {
    const db = await DatabaseService.openConnection();
    return new Promise(async (resolve, reject) => {
      try {
        db.transaction((tx) => {
          tx.executeSql("select * from items", [], (_, { rows }) =>
            resolve(rows)
          );
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
