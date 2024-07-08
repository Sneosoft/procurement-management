const mongoose = require("mongoose");

module.exports = class OrderModel {
  constructor({ config }) {
    this.getSchema = new config.mongoConnect.Schema(
      {
        amount: {
          type: Number,
          reequired: true,
        },
        formId: {
          type: String,
          required: true,
        },
        clientId: {
          type: String,
          required: true,
        },
        pmId: {
          type: String,
          required: true,
        },
        imId: {
          type: String,
          required: true,
        },
        formData: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
          default: {},
        },
        status: {
          type: String,
          enum: [
            "order_placed",
            "in_transit",
            "delivered",
            "inspection_pending",
            "inspection_completed",
            "rejected",
          ],
          required: true,
          default: "order_placed",
        },
        documentUploaded: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
          default: {},
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

    this.getModel = config.mongoConnect.model(
      "orders",
      this.getSchema,
      "orders"
    );
  }

  getOrders = async ({ id }) => {
    console.log({ id });
    if (id) {
      return await this.getModel
        .find({
          _id: id,
          delete: { $ne: 1 },
        })
        .catch((e) => {
          throw `${e}`;
        });
    } else {
      return this.getModel
        .find({
          delete: { $ne: 1 },
        })
        .catch((e) => {
          throw `${e}`;
        });
    }
  };

  createOrder = async (query) => {
    return this.getModel.create(query).catch((e) => {
      throw `${e}`;
    });
  };

  getOrderById = async ({ id }) => {
    return this.getModel.findById(id).catch((e) => {
      throw `${e}`;
    });
  };

  deleteOrderById = async ({ id }) => {
    return this.getModel.findByIdAndUpdate(id, { delete: 1 }).catch((e) => {
      throw `${e}`;
    });
  };

  updateOrderById = async ({ id, args }) => {
    return this.getModel.findByIdAndUpdate(id, args);
  };

  getOrderStatusById = async ({ id }) => {
    return this.getModel.findById(id, { status: 1 }).catch((e) => {
      throw `${e}`;
    });
  };

  changeIMId = async ({ id, imId }) => {
    return this.getModel
      .findByIdAndUpdate(id, { imId }, { new: true })
      .catch((e) => {
        throw `${e}`;
      });
  };

  changePMId = async ({ id, pmId }) => {
    return this.getModel
      .findByIdAndUpdate(id, { pmId }, { new: true })
      .catch((e) => {
        throw `${e}`;
      });
  };

  changeInspectionStatus = async ({ id, status }) => {
    return this.getModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .catch((e) => {
        throw `${e}`;
      });
  };

  updateInspectionForm = async ({ id, updatedForm }) => {
    console.log({ id, updatedForm });
    return this.getModel
      .findByIdAndUpdate(id, { formData: updatedForm })
      .catch((e) => {
        throw `${e}`;
      });
  };

  getInspectionFormById = async ({ id }) => {
    return this.getModel.findById(id, { formData: 1 }).catch((e) => {
      throw `${e}`;
    });
  };

  getDocumentDetails = async ({ id }) => {
    return this.getModel
      .findById(id, { "formData.documents": 1, documentUploaded: 1 })
      .catch((e) => {
        throw `${e}`;
      });
  };

  uploadDocument = async ({ id, documentUploaded }) => {
    return this.getModel
      .findByIdAndUpdate(id, { documentUploaded })
      .catch((e) => {
        throw `${e}`;
      });
  };
};
