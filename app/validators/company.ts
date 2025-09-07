import vine from '@vinejs/vine'

export const addCompanyValidator = vine.compile(
  vine.object({
    name: vine.string(),
    ownerId: vine.number(),
    phoneNumber: vine.string().minLength(10),
    idNat: vine.string().optional(),
    rccm: vine.string().optional(),
  })
)

export const updateCompanyValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    ownerId: vine.number().optional(),
    phoneNumber: vine.string().minLength(10).optional(),
    idNat: vine.string().optional(),
    rccm: vine.string().optional(),
  })
)
