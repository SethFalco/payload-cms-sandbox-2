import type { CollectionConfig } from 'payload'

export enum Status {
  PREVIEW = 'preview',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
}

export const CustomType: CollectionConfig = {
  slug: 'custom-type',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      options: Object.values(Status),
      admin: {
        components: {
          Cell: '/components/CustomCellStatus',
        },
      },
    },
    {
      name: 'timestamps',
      type: 'json',
      required: true,
    },
  ],
  endpoints: [
    {
      path: '/:id/set-status',
      method: 'post',
      handler: async (req) => {
        const body = await req.json?.()

        if (!body?.status) {
          return new Response(null, { status: 400 })
        }

        const documentId = req.routeParams!.id as string
        const status = body.status as Status

        req.payload.update({
          collection: 'custom-type',
          id: documentId,
          data: {
            status,
          },
        })

        return new Response(null, { status: 204 })
      },
    },
  ],
  admin: {
    listSearchableFields: ['clipId'],
  },
}
