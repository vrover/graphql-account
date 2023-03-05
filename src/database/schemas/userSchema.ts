const mongoose = require("mongoose");
const Schema = mongoose.Schema;
export const userSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});