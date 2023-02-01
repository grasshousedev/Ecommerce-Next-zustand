export default{
    name: 'banner',
    title: 'Hero Image',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            description: 'For internal use only'
        },

        {
            name: "image",
            type: "image",
            title: "image",
            options:{
                hotspot: true
            }
        }, 
        
        {
            name: 'callToAction',
            title: 'Call to action',
            type: 'object',
            options: {
                columns: 2
            },

            fields:[
                {
                    name: 'text',
                    title: 'Link text',
                    type: 'string'
                },

                {
                    name: 'url',
                    title: 'Link url',
                    type: 'url'
                }
            ]

        },

        {
            name: 'type',
            title: 'Banner type',
            type: 'string',
            options: {
                list: ['Hero image','Sale', 'Promo', 'Breaking']
            }

        }
    ]
}