import { prop } from "@typegoose/typegoose";

export class PersistedSchema {
  @prop()
  _id?: string;

  get id(): string {
    return this._id!;
  }

  set id(id: string) {
    if (id) {
      this._id = id;
    }
  }
}