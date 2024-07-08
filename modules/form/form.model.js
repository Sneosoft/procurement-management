const mongoose = require("mongoose");

module.exports = class FormModel {
  constructor({ config }) {
    this.getSchema = new config.mongoConnect.Schema(
      {
        templateName: {
          type: String,
          unique: true,
        },
        content: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
          default: {},
        },
        version: {
          type: Number,
        },
        delete: {
          type: Number,
          default: 0,
        },
      },
      {
        timestamps: true,
      }
    );

    this.getModel = config.mongoConnect.model("forms", this.getSchema, "forms");
  }

  getForms = async ({ id = null }) => {
    console.log({ id });
    if (id) {
      return this.getModel
        .find({ _id: id, delete: { $ne: 1 } }, { __v: 0, _id: 0 })
        .catch((e) => {
          throw `${e}`;
        });
    } else {
      return this.getModel
        .find({ delete: { $ne: 1 } }, { __v: 0, _id: 0 })
        .catch((e) => {
          throw `${e}`;
        });
    }
  };

  createForm = async (query) => {
    return this.getModel.create(query).catch((e) => {
      throw `${e}`;
    });
  };

  getFormById = async ({ id }) => {
    return this.getModel.findById(id).catch((e) => {
      throw `${e}`;
    });
  };
  deleteFormById = async ({ id }) => {
    return this.getModel.findByIdAndUpdate(id, { delete: 1 }).catch((e) => {
      throw `${e}`;
    });
  };

  getFormContentById = async ({ id }) => {
    console.log({ id });
    return this.getModel
      .findById(id, { content: 1 })
      .lean()
      .catch((e) => {
        throw `${e}`;
      });
  };
};
