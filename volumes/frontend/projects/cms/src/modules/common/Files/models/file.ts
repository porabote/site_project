import Model from "@/app/__models/model";
import Api from "@/services";

class File extends Model {

  static get apiEntityName(): string {
    return "File";
  }

  async upload(formData) {
    return await Api.post(`/api/files/method/upload`, {
      body: formData
    });
  }

}

export default File;
