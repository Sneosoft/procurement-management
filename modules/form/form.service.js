module.exports = class FormService {
  constructor({ formModel }) {
    this.getFormRepo = formModel.getForms;
    this.createFormRepo = formModel.createForm;
    this.getFormByIdRepo = formModel.getFormById;
    this.deleteFormRepo = formModel.deleteFormById;
  }
  getForm = async ({ id }) => {
    if (id) {
      const result = await this.getFormRepo({ id });
      return result?.length ? result.pop() : null;
    } else {
      return await this.getFormRepo({});
    }
  };

  createForm = async ({ templateName, content }) => {
    return await this.createFormRepo({
      templateName,
      content,
      version: 1,
      delete: 0,
    });
  };

  updateForm = async ({ id, ...args }) => {
    const oldForm = await this.getFormByIdRepo({ id });
    if (!oldForm) {
      throw "No Form Found";
    }

    let { templateName, content, version } = oldForm;

    const newContent = { ...content, ...args.content };
    const newTemplateName = args.templateName
      ? args.templateName
      : templateName;
    const updateData = {
      content: newContent,
      templateName: newTemplateName,
      version: ++version,
    };
    return await this.createFormRepo(updateData);
  };

  deleteForm = async ({ id }) => {
    return await this.deleteFormRepo({
      id,
    });
  };
};
