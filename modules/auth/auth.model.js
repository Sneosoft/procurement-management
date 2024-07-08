const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
module.exports = class AuthModel {
  constructor({ config }) {
    this.mongoose = config.mongoConnect;
    this.authSchema = new config.mongoConnect.Schema(
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        email: {
          type: String,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        mobile: {
          type: Number,
          required: true,
        },
        delete: {
          type: Number,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        accessLevel: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );
    this.getModel = this.mongoose.model("auths", this.authSchema, "auths");
  }
  addUserAuth = async (data) => {
    return this.getModel.create(data);
  };
  getAuthUser = async (username) => {
    let result = await this.getModel
      .findOne({ email: username, delete: 0 })
      .catch((e) => {
        throw `${e}`;
      });

    console.log({ result });
    if (!result) {
      console.log({ username });
      result = await this.getModel
        .findOne({
          mobile: Number(username),
          role: "inspectionmanager",
          delete: 0,
        })
        .catch((e) => {
          throw `${e}`;
        });
      console.log({ result });
    }
    return result;
    // return null;
  };

  updateAuth = async ({ id, updates }) => {
    let { mobile = null, email = null, password = null } = updates;
    const authUpdate = {};
    if (mobile) {
      authUpdate.mobile = mobile;
    }
    if (email) {
      authUpdate.email = email;
    }
    if (password) {
      authUpdate.password = bcrypt.hashSync(password, 10);
    }
    return this.getModel
      .findOneAndUpdate({ userId: id }, { ...authUpdate })
      .catch((e) => {
        throw `${e}`;
      });
  };

  deleteAuth = async ({ email }) => {
    return this.getModel
      .findOneAndUpdate({ email }, { delete: 1 })
      .catch((e) => {
        throw `${e}`;
      });
  };
};
