import { MultipartFile } from '@adonisjs/core/bodyparser'
import { cuid } from '@adonisjs/core/helpers'

export class UploadFileService {
  async upload(file: MultipartFile, path: string) {
    const uuid = cuid()
    const fileName = `${uuid}.png`

    file.move(`uploads/${path}`, {
      name: fileName,
      overwrite: false,
    })

    return path + '/' + fileName
  }
}
