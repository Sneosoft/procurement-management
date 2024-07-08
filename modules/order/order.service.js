module.exports = class OrderService {
  constructor({ orderModel, formModel }) {
    this.getOrderRepo = orderModel.getOrders;
    this.createOrderRepo = orderModel.createOrder;
    this.getOrderByIdRepo = orderModel.getOrderById;
    this.deleteOrderRepo = orderModel.deleteOrderById;
    this.getFormContentByIdRepo = formModel.getFormContentById;
    this.updateOrderByIdRepo = orderModel.updateOrderById;

    this.getOrderStatus = orderModel.getOrderStatusById;
    this.changeIMId = orderModel.changeIMId;
    this.changePMId = orderModel.changePMId;
    this.changeInspectionStatus = orderModel.changeInspectionStatus;
    this.updateInspectionFormRepo = orderModel.updateInspectionForm;
    this.getInspectionFormById = orderModel.getInspectionFormById;
    this.getOrderDocumentRepo = orderModel.getDocumentDetails;
    this.uploadDocumentRepo = orderModel.uploadDocument;
  }

  getOrder = async ({ id }) => {
    if (id) {
      const result = await this.getOrderRepo({ id });
      console.log({ result });
      return result?.length ? result.pop() : null;
    } else {
      return await this.getOrderRepo({});
    }
  };

  // createOrder = async ({ formId, amount, pmId, imId, clientId }) => {
  //   const formData = await this.getFormContentByIdRepo({ id: formId });
  //   return await this.createOrderRepo({
  //     amount,
  //     formId,
  //     pmId,
  //     imId,
  //     clientId,
  //     formData: formData?.content,
  //     delete: 0,
  //     status: "order_placed",
  //   });
  // };

  createOrder = async ({ formId, amount, pmId, imId, clientId }) => {
    const formData = await this.getFormContentByIdRepo({ id: formId });
    console.log({ formData });
    if (!formData) {
      throw "Form not Found";
    }
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

  getOrderDocument = async ({ id }) => {
    return this.getOrderDocumentRepo({ id });
  };

  uploadDocument = async ({ id, type, filePath }) => {
    const documentUploaded = {
      [type]: filePath,
    };
    return this.uploadDocumentRepo({ id, documentUploaded });
  };
};
