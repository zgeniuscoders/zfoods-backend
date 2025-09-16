import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique({ table: 'users', column: 'email' }).optional(),
    fullName: vine.string().escape().minLength(3).optional(),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    password: vine.string().minLength(8),
    newPassword: vine.string().minLength(8),
  })
)
