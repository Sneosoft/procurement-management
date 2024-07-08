module.exports = class UserService {
  constructor({ userModel, formModel }) {
    this.getOrderRepo = userModel.getOrders;
    this.createOrderRepo = userModel.createOrder;
    this.getOrderByIdRepo = userModel.getOrderById;
    this.deleteOrderRepo = userModel.deleteOrderById;
    this.getFormContentByIdRepo = formModel.getFormContentById;
    this.updateOrderByIdRepo = userModel.updateOrderById;

    this.getOrderStatus = userModel.getOrderStatusById;
    this.changeIMId = userModel.changeIMId;
    this.changePMId = userModel.changePMId;
    this.changeInspectionStatus = userModel.changeInspectionStatus;
    this.updateInspectionFormRepo = userModel.updateInspectionForm;
    this.getInspectionFormById = userModel.getInspectionFormById;

    this.assignReportingManagerRepo = userModel.assignReportingManager;
  }

  getOrder = async ({ id }) => {
    if (id) {
      const result = await this.getOrderRepo({ id });
      return result?.length ? result.pop() : null;
    } else {
      return await this.getOrderRepo({});
    }
  };

  createOrder = async ({ formId, amount, pmId, imId, clientId }) => {
    const formData = await this.getFormContentByIdRepo({ id: formId });
    return await this.createOrderRepo({
      amount,
      formId,
      pmId,
      imId,
      clientId,
      formData: formData?.content,
      delete: 0,
      status: "order_placed",
    });
  };

  updateOrder = async ({ id, updates }) => {
    const { formId, ...args } = updates;
    const oldOrder = await this.getOrderByIdRepo({ id });
    if (oldOrder.formId != formId) {
      const formData = await this.getFormContentByIdRepo({ id: formId });
      args.formId = formId;
      args.formData = formData?.content;
    }
    return await this.updateOrderByIdRepo({ id, args });
  };

  deleteOrder = async ({ id }) => {
    return await this.deleteOrderRepo({
      id,
    });
  };

  trackOrderStatus = async ({ id }) => {
    return this.getOrderStatus({ id });
  };

  updatePMId = async ({ id, pmId }) => {
    return this.changePMId({ id, pmId });
  };

  updateIMId = async ({ id, imId }) => {
    return this.changeIMId({ id, imId });
  };

  updateInspectionStatus = async ({ id, status }) => {
    return this.changeInspectionStatus({ id, status });
  };

  updateInspectionForm = async ({ id, filledForm }) => {
    const getOrderRepo = await this.getOrderByIdRepo({ id });
    const formId = getOrderRepo.formId;
    const formContent = await this.getFormContentByIdRepo({ id: formId });
    const updatedForm = { ...formContent.content, ...filledForm };
    return this.updateInspectionFormRepo({ id, updatedForm });
  };

  getInspectionForm = async ({ id }) => {
    return this.getInspectionFormById({ id });
  };

  assignReportingManager = async ({ id, reportTo }) => {
    return this.assignReportingManagerRepo({ id, reportTo });
  };
};
