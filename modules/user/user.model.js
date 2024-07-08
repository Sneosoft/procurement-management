module.exports = class UserModel {
  constructor({ config }) {
    this.getSchema = new config.mongoConnect.Schema(
      {
        email: {
          type: String,
          unique: true,
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
        mobile: {
          type: Number,
          required: true,
        },
        reportTo: {
          type: String,
          default: "",
        },
        delete: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    );

    this.getModel = config.mongoConnect.model("users", this.getSchema, "users");
  }

  getUserById = async (query) => {
    const { id = null } = query;
    let mongQuery = {};
    if (id) {
      mongQuery = { _id: id, delete: { $ne: 1 } };
      return this.getModel
        .findOne(mongQuery, { __v: 0, _id: 0 })
        .catch(console.log);
    } else {
      mongQuery = { delete: { $ne: 1 } };
      return this.getModel
        .find(mongQuery, { __v: 0, _id: 0 })
        .catch(console.log);
    }
  };

  createUser = async (userData) => {
    return this.getModel.create(userData).catch((e) => {
      throw `${e}`;
    });
  };

  updateUser = async ({ id, ...updates }) => {
    return this.getModel.findByIdAndUpdate(id, { ...updates }).catch((e) => {
      throw `${e}`;
    });
  };

  deleteUser = async ({ id }) => {
    return this.getModel.findByIdAndUpdate(id, { delete: 1 }).catch((e) => {
      throw `${e}`;
    });
  };
  assignReportingManager = async ({ id, reportTo }) => {
    return this.getModel.findByIdAndUpdate(id, { reportTo }).catch((e) => {
      throw `${e}`;
    });
  };
};
