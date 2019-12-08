class FormDataSend {
  static buildForm(data) {
    let form = new FormData()

    for (const key of Object.keys(data))
      form.append(key, data[key])

    return form
  }
}

export default FormDataSend