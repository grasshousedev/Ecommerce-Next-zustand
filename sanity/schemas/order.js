export default{
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [

        {
            title: 'Date',
            name: 'date',
            type: 'date',
            options: {
              dateFormat: 'YYYY-MM-DD',
              calendarTodayLabel: 'Today'
            }
          },

        {
            name: 'name',
            title: 'Name',
            type: 'string',
            options:{
                maxLenght: 40
            }
        },

        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            options:{
                maxLenght: 15
            }
        },

        {
            name: 'address',
            title: 'Address',
            type: 'string',
            options:{
                maxLenght: 100
            }
        },

        
        {
            name: 'dishSluges',
            title: 'Sluges',
            type: 'array',
            of: [{type: 'string'}]

        },

        {
            name: 'dishQuantities',
            title: 'Quantity',
            type: 'array',
            of: [{type: 'number'}]

        },

        {
            name: 'dishSizes',
            title: 'Sizes',
            type: 'array',
            of: [{type: 'number'}]

        },

        

      

        {
            name: 'total',
            title: 'Total',
            type: 'number'
        },


        {
            name: 'method',
            title: 'Method',
            type: 'number',

        },

       

        
        {
            name: 'status',
            title: 'Status',
            type: 'number'
        }
        
        

    ]
}