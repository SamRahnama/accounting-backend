import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from "Database/factories/UserFactory";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    /*const users =*/
    await UserFactory.createMany(10)
  }
}
